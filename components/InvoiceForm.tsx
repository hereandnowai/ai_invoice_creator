
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Invoice, LineItem, Customer, BusinessDetails, InvoiceStatus } from '../types';
import { generateInvoiceNumber, calculateTotals } from '../utils/invoiceUtils';
import { INPUT_CLASS, BUTTON_PRIMARY_CLASS, BUTTON_SECONDARY_CLASS, CARD_CLASS, BRAND_CONFIG } from '../constants';
import { PlusCircleIcon, TrashIcon, MicrophoneIcon } from './icons/ActionIcons';
import { parseInvoiceDataFromText, ParsedInvoiceData } from '../services/geminiService';
import { NotificationPayload } from '../App';
import { EditTranscriptModal } from './EditTranscriptModal';
import { AudioVisualizer } from './AudioVisualizer'; // Import the new component

interface InvoiceFormProps {
  onSave: (invoice: Invoice) => void;
  businessDetails: BusinessDetails;
  existingInvoice: Invoice | null;
  onClearExistingInvoice: () => void;
  setNotification: (notification: NotificationPayload) => void;
}

const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const MIC_AVAILABLE = !!SpeechRecognition;


export const InvoiceForm: React.FC<InvoiceFormProps> = ({ onSave, businessDetails, existingInvoice, onClearExistingInvoice, setNotification }) => {
  const initialCustomerState: Customer = { name: '', email: '', address: '', phone: '' };
  const initialLineItem: LineItem = { id: Date.now().toString(), description: '', quantity: 1, unitPrice: 0, total: 0 };

  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [customer, setCustomer] = useState<Customer>(initialCustomerState);
  const [items, setItems] = useState<LineItem[]>([initialLineItem]);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<InvoiceStatus>(InvoiceStatus.DRAFT);
  const [currentInvoiceId, setCurrentInvoiceId] = useState<string | null>(null);

  const [subtotal, setSubtotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Voice input states
  const [isListening, setIsListening] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState(''); 
  const [editableTranscript, setEditableTranscript] = useState(''); 
  const [isEditTranscriptModalOpen, setIsEditTranscriptModalOpen] = useState(false);
  const [processingTranscript, setProcessingTranscript] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const speechRecognitionRef = useRef<any>(null);
  const accumulatedFinalTranscriptRef = useRef<string>('');
  const [audioVisualizerStream, setAudioVisualizerStream] = useState<MediaStream | null>(null);


  useEffect(() => {
    if (existingInvoice) {
      setCurrentInvoiceId(existingInvoice.id);
      setInvoiceNumber(existingInvoice.invoiceNumber);
      setDate(existingInvoice.date);
      setDueDate(existingInvoice.dueDate);
      setCustomer(existingInvoice.customer);
      setItems(existingInvoice.items);
      setNotes(existingInvoice.notes || '');
      setStatus(existingInvoice.status);
    } else {
      resetFormFields();
    }
  }, [existingInvoice, businessDetails.invoicePrefix]);
  
  const resetFormFields = useCallback(() => {
    setCurrentInvoiceId(null);
    setInvoiceNumber(generateInvoiceNumber(businessDetails.invoicePrefix));
    setDate(new Date().toISOString().split('T')[0]);
    setDueDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    setCustomer(initialCustomerState);
    setItems([{ ...initialLineItem, id: Date.now().toString() }]);
    setNotes('');
    setStatus(InvoiceStatus.DRAFT);
  },[businessDetails.invoicePrefix, initialCustomerState, initialLineItem]);

  const resetForm = useCallback(() => {
    resetFormFields();
    onClearExistingInvoice();
  }, [resetFormFields, onClearExistingInvoice]);


  useEffect(() => {
    const { subtotal, taxAmount, totalAmount } = calculateTotals(items, businessDetails.taxRate);
    setSubtotal(subtotal);
    setTaxAmount(taxAmount);
    setTotalAmount(totalAmount);
  }, [items, businessDetails.taxRate]);

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomer(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleItemChange = (index: number, field: keyof LineItem, value: string | number) => {
    const newItems = [...items];
    const itemToUpdate = { ...newItems[index] }; 
    
    if (field === 'quantity' || field === 'unitPrice') {
        const numValue = Number(value);
        if (isNaN(numValue) || numValue < 0) return; 
        (itemToUpdate[field] as number) = numValue;
    } else if (field === 'description') {
        (itemToUpdate[field] as string) = String(value);
    }
    
    itemToUpdate.total = itemToUpdate.quantity * itemToUpdate.unitPrice;
    newItems[index] = itemToUpdate;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { ...initialLineItem, id: Date.now().toString() + Math.random().toString(16).slice(2) }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    } else {
      setNotification({ message: "An invoice must have at least one line item.", type: 'info' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.name || !customer.email) {
        setNotification({message: "Customer name and email are required.", type: 'error'});
        return;
    }
    if (items.some(item => !item.description || item.quantity <= 0 || item.unitPrice < 0)) {
        setNotification({message: "All line items must have a description, positive quantity and non-negative unit price.", type: 'error'});
        return;
    }

    const newInvoice: Invoice = {
      id: currentInvoiceId || Date.now().toString(),
      invoiceNumber,
      date,
      dueDate,
      customer,
      items,
      subtotal,
      taxAmount,
      totalAmount,
      notes,
      status,
      taxRateApplied: businessDetails.taxRate,
    };
    onSave(newInvoice);
    if (!existingInvoice) { 
      resetFormFields();
    }
  };

  const populateFormFromParsedData = (data: ParsedInvoiceData) => {
    if (data.customer) {
      setCustomer(prev => ({
        name: data.customer?.name || prev.name,
        email: data.customer?.email || prev.email,
        address: data.customer?.address || prev.address,
        phone: data.customer?.phone || prev.phone,
      }));
    }
    if (data.date) setDate(data.date);
    if (data.dueDate) setDueDate(data.dueDate);
    if (data.items && data.items.length > 0) {
      const newItems: LineItem[] = data.items.map((item, index) => ({
        id: Date.now().toString() + index + Math.random().toString(16).slice(2),
        description: item.description || '',
        quantity: Number(item.quantity) || 1,
        unitPrice: Number(item.unitPrice) || 0,
        total: (Number(item.quantity) || 1) * (Number(item.unitPrice) || 0),
      }));
      setItems(newItems);
    } else if (data.items && data.items.length === 0) {
      setItems([{ ...initialLineItem, id: Date.now().toString() + Math.random().toString(16).slice(2) }]);
    }
    if (typeof data.notes === 'string') setNotes(data.notes);
  };

  const handleProcessEditedTranscript = async (finalTranscript: string) => {
    setIsEditTranscriptModalOpen(false); 
    if (!finalTranscript.trim()) {
      setNotification({ message: 'No text provided to process.', type: 'info' });
      return;
    }
    setProcessingTranscript(true);
    setSpeechError(null);
    setNotification({ message: '🤖 Processing your request...', type: 'info' });

    try {
      const parsedData = await parseInvoiceDataFromText(finalTranscript);
      if (parsedData && Object.keys(parsedData).length > 0) {
        populateFormFromParsedData(parsedData);
        setNotification({ message: 'Invoice details populated!', type: 'success' });
      } else if (parsedData && Object.keys(parsedData).length === 0) {
        setNotification({ message: 'Could not extract specific details. Please review or try again.', type: 'info' });
      } else {
        setNotification({ message: 'Failed to understand invoice details. Please try again or enter manually.', type: 'error' });
      }
    } catch (error) {
      console.error("Error processing transcript with Gemini:", error);
      setNotification({ message: 'Error processing your request. Please try again.', type: 'error' });
    } finally {
      setProcessingTranscript(false);
      setEditableTranscript(''); 
      setLiveTranscript('');
      accumulatedFinalTranscriptRef.current = '';
    }
  };
  
  const stopListeningCleanup = () => {
    setIsListening(false);
    // audioVisualizerStream tracks are stopped by useEffect when stream becomes null
    setAudioVisualizerStream(null); 
  };

  const toggleListening = async () => {
    if (!MIC_AVAILABLE) {
      setNotification({ message: "Speech recognition is not available in your browser.", type: 'error' });
      return;
    }

    if (isListening) {
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop(); // This will trigger 'onend'
      }
      // stopListeningCleanup will be called in onend
    } else {
      // Start listening
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setAudioVisualizerStream(stream);

        speechRecognitionRef.current = new SpeechRecognition();
        speechRecognitionRef.current.continuous = true;
        speechRecognitionRef.current.interimResults = true; 
        
        accumulatedFinalTranscriptRef.current = '';

        speechRecognitionRef.current.onresult = (event: any) => {
          let interimTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const transcriptPart = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              accumulatedFinalTranscriptRef.current += transcriptPart + ' ';
            } else {
              interimTranscript += transcriptPart;
            }
          }
          setLiveTranscript(accumulatedFinalTranscriptRef.current + interimTranscript);
        };

        speechRecognitionRef.current.onend = () => {
          stopListeningCleanup();
          const finalTranscriptToProcess = accumulatedFinalTranscriptRef.current.trim();
          if (finalTranscriptToProcess) {
            setEditableTranscript(finalTranscriptToProcess);
            setIsEditTranscriptModalOpen(true);
          } else if (!speechError && !processingTranscript) { 
             // Avoid showing message if an error or processing is already indicated
             // setNotification({ message: 'Voice input stopped.', type: 'info' });
          }
          // Do not clear liveTranscript here if modal is open
        };

        speechRecognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          let message = `Speech recognition error: ${event.error}. Please try again.`;
          if (event.error === 'no-speech') message = 'No speech was detected. Microphone might not be capturing audio.';
          else if (event.error === 'audio-capture') message = 'Audio capture failed. Ensure microphone is connected and permitted.';
          else if (event.error === 'not-allowed') message = 'Microphone access denied. Please enable it in browser settings.';
          else if (event.error === 'aborted') message = 'Speech recognition aborted. If you stopped it manually, this is normal. Otherwise, please try again.';
          
          setSpeechError(message);
          setNotification({ message, type: 'error' });
          stopListeningCleanup(); 
          setLiveTranscript('');
          accumulatedFinalTranscriptRef.current = '';
        };
        
        speechRecognitionRef.current.start();
        setIsListening(true);
        setSpeechError(null);
        setLiveTranscript(''); 
        setEditableTranscript('');
        setNotification({ message: '🎤 Listening... Click mic to stop.', type: 'info' });

      } catch (err) {
        console.error("Error getting user media for visualizer or starting recognition:", err);
        setNotification({ message: 'Failed to access microphone. Please check permissions.', type: 'error' });
        stopListeningCleanup(); // Ensure cleanup if start fails
      }
    }
  };

  // Effect for cleaning up speech recognition on component unmount
  useEffect(() => {
    const speechRecInstance = speechRecognitionRef.current;
    return () => {
      if (speechRecInstance) {
        speechRecInstance.abort(); 
      }
    };
  }, []); // Empty dependency array: runs only on mount and unmount

  // Effect for cleaning up the audio visualizer stream when it changes or on unmount
  useEffect(() => {
    const currentStream = audioVisualizerStream;
    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [audioVisualizerStream]);


  const labelClass = "block text-sm font-medium text-gray-300 mb-1";
  const sectionTitleClass = `text-xl font-semibold text-[${BRAND_CONFIG.colors.primary}]`;
  const formSectionBgClass = "bg-gray-700";

  return (
    <>
      <form onSubmit={handleSubmit} className={`${CARD_CLASS} space-y-8`}>
        <div className="flex justify-between items-center border-b-2 border-[${BRAND_CONFIG.colors.primary}] pb-2">
          <h2 className={`text-3xl font-bold text-[${BRAND_CONFIG.colors.primary}]`}>
            {existingInvoice ? 'Edit Invoice' : 'Create New Invoice'}
          </h2>
          {MIC_AVAILABLE && (
            <div className="relative">
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2 rounded-full transition-colors duration-150 ease-in-out
                            ${isListening ? `bg-red-500 hover:bg-red-600 text-white animate-pulse` : `bg-[${BRAND_CONFIG.colors.primary}] hover:bg-yellow-400 text-black`}
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[${BRAND_CONFIG.colors.primary}]`}
                aria-label={isListening ? 'Stop listening' : 'Start voice input'}
                disabled={processingTranscript || isEditTranscriptModalOpen} 
              >
                <MicrophoneIcon className="w-6 h-6" />
              </button>
              {isListening && <span className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>}
            </div>
          )}
        </div>

        {/* Visualizer and Status Display Area */}
        {MIC_AVAILABLE && (isListening || liveTranscript || processingTranscript || speechError) && !isEditTranscriptModalOpen && (
          <div className="my-4 space-y-2">
            <div className={`p-3 rounded-md text-sm text-center min-h-[40px] flex items-center justify-center
              ${speechError ? 'bg-red-700/30 text-red-300' : 'bg-gray-700/50 text-gray-300'}`}>
              {processingTranscript ? "🤖 Processing your request..." : 
              isListening ? liveTranscript ? `🗣️ "${liveTranscript}"` : "🎤 Listening... Click mic to stop." : 
              speechError || (liveTranscript ? `Last heard: "${liveTranscript}"` : "Voice input ready.")}
            </div>
            {isListening && audioVisualizerStream && (
              <div className="h-20 bg-gray-700/50 rounded-md overflow-hidden">
                <AudioVisualizer stream={audioVisualizerStream} barColor={BRAND_CONFIG.colors.primary} />
              </div>
            )}
          </div>
        )}


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="invoiceNumber" className={labelClass}>Invoice Number</label>
            <input type="text" id="invoiceNumber" value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} className={INPUT_CLASS} required />
          </div>
          <div>
            <label htmlFor="date" className={labelClass}>Invoice Date</label>
            <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} className={INPUT_CLASS} required />
          </div>
          <div>
            <label htmlFor="dueDate" className={labelClass}>Due Date</label>
            <input type="date" id="dueDate" value={dueDate} onChange={e => setDueDate(e.target.value)} className={INPUT_CLASS} required />
          </div>
        </div>

        <div className={`space-y-4 p-6 border border-gray-700 rounded-lg ${formSectionBgClass}`}>
          <h3 className={sectionTitleClass}>Customer Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                  <label htmlFor="customerName" className={labelClass}>Name</label>
                  <input type="text" name="name" id="customerName" value={customer.name} onChange={handleCustomerChange} className={INPUT_CLASS} required />
              </div>
              <div>
                  <label htmlFor="customerEmail" className={labelClass}>Email</label>
                  <input type="email" name="email" id="customerEmail" value={customer.email} onChange={handleCustomerChange} className={INPUT_CLASS} required />
              </div>
          </div>
          <div>
              <label htmlFor="customerAddress" className={labelClass}>Address</label>
              <textarea name="address" id="customerAddress" value={customer.address} onChange={handleCustomerChange} rows={3} className={INPUT_CLASS} required></textarea>
          </div>
          <div>
              <label htmlFor="customerPhone" className={labelClass}>Phone (Optional)</label>
              <input type="tel" name="phone" id="customerPhone" value={customer.phone || ''} onChange={handleCustomerChange} className={INPUT_CLASS} />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className={sectionTitleClass}>Line Items</h3>
          {items.map((item, index) => (
            <div key={item.id} className={`grid grid-cols-12 gap-x-4 gap-y-2 items-end p-4 border border-gray-700 rounded-md ${formSectionBgClass}`}>
              <div className="col-span-12 md:col-span-5">
                <label htmlFor={`description-${index}`} className="block text-xs font-medium text-gray-400 mb-1">Description</label>
                <input type="text" id={`description-${index}`} value={item.description} onChange={e => handleItemChange(index, 'description', e.target.value)} className={INPUT_CLASS} placeholder="Service or Product" required />
              </div>
              <div className="col-span-4 md:col-span-2">
                <label htmlFor={`quantity-${index}`} className="block text-xs font-medium text-gray-400 mb-1">Quantity</label>
                <input type="number" id={`quantity-${index}`} value={item.quantity} onChange={e => handleItemChange(index, 'quantity', e.target.value)} className={INPUT_CLASS} min="1" required />
              </div>
              <div className="col-span-4 md:col-span-2">
                <label htmlFor={`unitPrice-${index}`} className="block text-xs font-medium text-gray-400 mb-1">Unit Price ({businessDetails.currencySymbol})</label>
                <input type="number" id={`unitPrice-${index}`} value={item.unitPrice} onChange={e => handleItemChange(index, 'unitPrice', e.target.value)} className={INPUT_CLASS} min="0" step="0.01" required />
              </div>
              <div className="col-span-4 md:col-span-2">
                  <label className="block text-xs font-medium text-gray-400 mb-1">Total ({businessDetails.currencySymbol})</label>
                  <input type="text" value={item.total.toFixed(2)} className={`${INPUT_CLASS} bg-gray-600`} readOnly />
              </div>
              <div className="col-span-12 md:col-span-1 flex justify-end md:self-end">
                <button type="button" onClick={() => removeItem(index)} className="text-red-400 hover:text-red-300 p-2 mt-2 md:mt-0">
                  <TrashIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
          <button type="button" onClick={addItem} className={`flex items-center space-x-2 text-[${BRAND_CONFIG.colors.primary}] hover:text-yellow-300 font-medium py-2 px-3 border border-dashed border-[${BRAND_CONFIG.colors.primary}] rounded-md`}>
            <PlusCircleIcon className="w-5 h-5" />
            <span>Add Item</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
              <label htmlFor="notes" className={labelClass}>Notes/Terms</label>
              <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows={4} className={INPUT_CLASS} placeholder="E.g., Payment due within 30 days. Thank you!"></textarea>
              
              <div>
                  <label htmlFor="status" className={labelClass}>Invoice Status</label>
                  <select id="status" value={status} onChange={e => setStatus(e.target.value as InvoiceStatus)} className={INPUT_CLASS}>
                      {Object.values(InvoiceStatus).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
              </div>
          </div>

          <div className={`space-y-3 p-6 ${formSectionBgClass} rounded-lg text-right`}>
            <div className="flex justify-between text-lg">
              <span className="font-medium text-gray-300">Subtotal:</span>
              <span className={`font-semibold text-[${BRAND_CONFIG.colors.primary}]`}>{businessDetails.currencySymbol}{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span className="font-medium text-gray-300">Tax ({businessDetails.taxRate}%):</span>
              <span className={`font-semibold text-[${BRAND_CONFIG.colors.primary}]`}>{businessDetails.currencySymbol}{taxAmount.toFixed(2)}</span>
            </div>
            <div className={`flex justify-between text-2xl font-bold border-t-2 border-[${BRAND_CONFIG.colors.primary}] pt-3 mt-3`}>
              <span className="text-white">Total Amount Due:</span>
              <span className="text-white">{businessDetails.currencySymbol}{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
          <button type="button" onClick={resetForm} className={BUTTON_SECONDARY_CLASS}>
            {existingInvoice ? 'Cancel Edit' : 'Clear Form'}
          </button>
          <button type="submit" className={BUTTON_PRIMARY_CLASS} disabled={processingTranscript || isListening || isEditTranscriptModalOpen}>
            {existingInvoice ? 'Update Invoice' : 'Save Invoice'}
          </button>
        </div>
      </form>
      {isEditTranscriptModalOpen && (
        <EditTranscriptModal
          isOpen={isEditTranscriptModalOpen}
          initialTranscript={editableTranscript || liveTranscript} 
          onClose={() => {
            setIsEditTranscriptModalOpen(false);
            setEditableTranscript('');
            // Consider if liveTranscript should be cleared here or kept for user reference.
            // accumulatedFinalTranscriptRef.current should be cleared if canceling the edit.
            accumulatedFinalTranscriptRef.current = '';
          }}
          onProcess={handleProcessEditedTranscript}
        />
      )}
    </>
  );
};
