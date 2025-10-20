"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Send, FileText, Upload, X, MessageCircle } from "lucide-react"

type Message = {
  id: number
  type: "user" | "bot"
  content: string
  timestamp: string
}

type Document = {
  id: string
  filename: string
  uploadedAt: string
}

export default function ChatPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [activeDocument, setActiveDocument] = useState<Document | null>(null)
  const [documents, setDocuments] = useState<Document[]>([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [showTopProgress, setShowTopProgress] = useState(false)
  const [isDocumentMode, setIsDocumentMode] = useState(false)

  const processingSteps = ["Upload", "OCR", "Language", "Segmentation", "AI Classification"]

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || [])
    setFiles(uploadedFiles)
  }, [])



const fetchDocuments = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/documents");
    if (!res.ok) throw new Error("Failed to fetch documents");
    const data: Document[] = await res.json();
    setDocuments(data);
  } catch (err) {
    console.error(err);
  }
};

const startProcessing = async () => {
  if (!files.length) return;
  setIsProcessing(true);
  setProgress(0);

  const formData = new FormData();
  formData.append("file", files[0]);

  try {
    setCurrentStep(0);
    setProgress(10);

    const res = await fetch("http://localhost:5000/api/documents/upload", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();

    for (let i = 1; i < processingSteps.length; i++) {
      setCurrentStep(i);
      setProgress(((i + 1) / processingSteps.length) * 100);
      await new Promise((r) => setTimeout(r, 800));
    }

    // Refresh full list from backend
    await fetchDocuments();

    // Set the active doc to the one just uploaded
    setActiveDocument((prev) =>
      documents.find((doc) => doc.id === data.documentId) || null
    );

    setIsProcessing(false);
    setShowTopProgress(false);
    setIsDrawerOpen(false);
    setFiles([]);
  } catch (err) {
    console.error(err);
    setIsProcessing(false);
    setShowTopProgress(false);
  }
};

  const handleDrawerClose = () => {
    if (isProcessing) {
      setShowTopProgress(true)
    }
    setIsDrawerOpen(false)
  }

  const handleDrawerOpenChange = (open: boolean) => {
    if (!open) {
      handleDrawerClose()
    } else {
      setIsDrawerOpen(open)
    }
  }

//  const handleSendMessage = async () => {
//   if (!message.trim()) return;

//   // Document mode requires an active document
//   if (isDocumentMode && !activeDocument) {
//     setMessages(prev => [
//       ...prev,
//       {
//         id: prev.length + 1,
//         type: "bot",
//         content: "Please select a document first to use document search mode.",
//         timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//       },
//     ]);
//     return;
//   }

//   // Add user's message
//   const newUserMessage: Message = {
//     id: messages.length + 1,
//     type: "user",
//     content: message,
//     timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//   };
//   setMessages(prev => [...prev, newUserMessage]);
//   setMessage("");

//   try {
//     // Send to backend query API
//     const res = await fetch("http://localhost:5000/api/query/ask", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         question: message,
//         documentId: isDocumentMode ? activeDocument?.id : null,
//       }),
//     });

//     if (!res.ok) throw new Error(`Query API failed: ${res.statusText}`);

//     const botData = await res.json();

//     // Add bot's reply
//     setMessages(prev => [
//       ...prev,
//       {
//         id: prev.length + 1,
//         type: "bot",
//         content: botData.answer,
//         timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//       },
//     ]);
//   } catch (err) {
//     console.error(err);
//     setMessages(prev => [
//       ...prev,
//       {
//         id: prev.length + 1,
//         type: "bot",
//         content: "Sorry, something went wrong while processing your request.",
//         timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//       },
//     ]);
//   }
// };

const handleSendMessage = async () => {
  if (!message.trim()) return;

  if (isDocumentMode && !activeDocument) {
    setMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        type: "bot",
        content: "Please select a document first to use document search mode.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    return;
  }

  // Add user's message
  const newUserMessage: Message = {
    id: messages.length + 1,
    type: "user",
    content: message,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };
  setMessages(prev => [...prev, newUserMessage]);
  setMessage("");

  try {
    // Build request body
    const bodyData: any = {
      question: message,
      isDocumentMode
    };
    if (isDocumentMode) {
      bodyData.documentId = activeDocument?.id;
    }

    const res = await fetch("http://localhost:5000/api/query/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });

    if (!res.ok) throw new Error(`Query API failed: ${res.statusText}`);

    const botData = await res.json();

    setMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        type: "bot",
        content: botData.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  } catch (err) {
    console.error(err);
    setMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        type: "bot",
        content: "Sorry, something went wrong while processing your request.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  }
};

useEffect(() => {
  fetchDocuments();
}, []);

  return (
    <div className="h-screen bg-gray-50/30 flex flex-col">
      {showTopProgress && isProcessing && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Upload className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">Processing {files[0]?.name}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowTopProgress(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-gray-500 mt-1">{processingSteps[currentStep]}</p>
          </div>
        </div>
      )}

      <div className="bg-white border-b border-gray-200/60 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">LawGPT Assistant</h1>
                <p className="text-sm text-gray-500">AI-powered legal document analysis</p>
              </div>

              {documents.length > 0 && isDocumentMode && (
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700">Document:</span>
                  <Select
                    value={activeDocument?.id || ""}
                    onValueChange={(value) => {
                      const doc = documents.find((d) => d.id === value)
                      setActiveDocument(doc || null)
                    }}
                  >
                    <SelectTrigger className="w-64 bg-white">
                      <SelectValue placeholder="Select a document" />
                    </SelectTrigger>
                    <SelectContent>
                      {documents.map((doc) => (
                        <SelectItem key={doc.id} value={doc.id}>
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-blue-600" />
                            <span className="truncate">{doc.filename}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <Sheet open={isDrawerOpen} onOpenChange={handleDrawerOpenChange}>
              <SheetTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle>Upload Document</SheetTitle>
                  <SheetDescription>Upload a PDF or DOCX file to analyze and ask questions about</SheetDescription>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors">
                      <Upload className="w-10 h-10 mx-auto text-gray-400 mb-3" />
                      <p className="text-sm font-medium text-gray-700 mb-1">Choose a file to upload</p>
                      <p className="text-xs text-gray-500 mb-4">PDF or DOCX files up to 10MB</p>
                      <input
                        type="file"
                        accept=".pdf,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload">
                        <Button variant="outline" size="sm" asChild className="cursor-pointer bg-transparent">
                          <span>Browse Files</span>
                        </Button>
                      </label>
                    </div>

                    {files.length > 0 && (
                      <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <FileText className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{files[0].name}</p>
                            <p className="text-xs text-gray-500">{(files[0].size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={startProcessing}
                      disabled={isProcessing || !files.length}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11"
                    >
                      {isProcessing ? "Processing..." : "Start Analysis"}
                    </Button>
                  </div>

                  {isProcessing && (
                    <div className="space-y-4">
                      <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-900">Processing Document</span>
                          <span className="text-sm font-medium text-blue-600">{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2 mb-3" />
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                          <span className="text-xs text-gray-600">{processingSteps[currentStep]}</span>
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 p-4 bg-gray-50 rounded-xl">
                        <p>You can close this drawer and the processing will continue in the background.</p>
                      </div>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <Card className="h-full flex flex-col shadow-sm border-gray-200/60">
          <CardContent className="flex-1 p-0 flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                      {isDocumentMode ? (
                        <FileText className="w-8 h-8 text-blue-600" />
                      ) : (
                        <MessageCircle className="w-8 h-8 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {isDocumentMode ? "Ready to analyze your documents" : "Ready to chat"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {isDocumentMode
                          ? activeDocument
                            ? `Ask questions about "${activeDocument.filename}"`
                            : "Select a document to get started"
                          : "Ask me anything - I'm here to help!"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.type === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-white border border-gray-200 text-gray-900 shadow-sm"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <p className={`text-xs mt-2 ${msg.type === "user" ? "text-blue-100" : "text-gray-500"}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">General Chat</span>
                  </div>
                  <Switch
                    checked={isDocumentMode}
                    onCheckedChange={setIsDocumentMode}
                    className="data-[state=checked]:bg-blue-600"
                  />
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Document Search</span>
                  </div>
                </div>
                {isDocumentMode && !activeDocument && documents.length > 0 && (
                  <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                    Select a document to continue
                  </span>
                )}
              </div>
              <div className="flex space-x-3">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    isDocumentMode
                      ? activeDocument
                        ? "Ask a question about your document..."
                        : "Select a document first..."
                      : "Ask me anything..."
                  }
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 h-11"
                  disabled={isDocumentMode && !activeDocument}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={(isDocumentMode && !activeDocument) || !message.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white h-11 px-4"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
