"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, CheckCircle, Clock, Languages, Scissors, Brain } from "lucide-react"
import Link from "next/link"

interface ProcessingStep {
  id: string
  name: string
  status: "pending" | "processing" | "completed" | "error"
  description: string
  icon: any
}

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const processingSteps: ProcessingStep[] = [
    {
      id: "upload",
      name: "File Upload",
      status: "completed",
      description: "Document uploaded successfully",
      icon: Upload,
    },
    {
      id: "ocr",
      name: "OCR Processing",
      status: "processing",
      description: "Extracting text from document",
      icon: FileText,
    },
    {
      id: "language",
      name: "Language Detection",
      status: "pending",
      description: "Detecting document language",
      icon: Languages,
    },
    {
      id: "segmentation",
      name: "Clause Segmentation",
      status: "pending",
      description: "Splitting into logical chunks",
      icon: Scissors,
    },
    {
      id: "classification",
      name: "AI Classification",
      status: "pending",
      description: "Classifying clauses with Legal-BERT",
      icon: Brain,
    },
  ]

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || [])
    setFiles(uploadedFiles)
  }, [])

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFiles = Array.from(event.dataTransfer.files)
    setFiles(droppedFiles)
  }, [])

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }, [])

  // const startProcessing = async () => {
  //   setIsProcessing(true)
  //   setProgress(0)

  //   // Simulate processing steps
  //   for (let i = 0; i < processingSteps.length; i++) {
  //     setCurrentStep(i)
  //     setProgress(((i + 1) / processingSteps.length) * 100)
  //     await new Promise((resolve) => setTimeout(resolve, 2000))
  //   }

  //   setIsProcessing(false)
  // }

  const startProcessing = async () => {
  if (files.length === 0) return;

  setIsProcessing(true);
  setProgress(0);

  const formData = new FormData();
  formData.append('file', files[0]); // Only handling first file for now.

  try {
    // Step 1: Upload File (simulate upload progress)
    setCurrentStep(0);
    setProgress(10);

    await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate delay

    // Step 2: Send to Backend API
    const response = await fetch('http://localhost:5000/api/documents/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload document');
    }

    const data = await response.json();

    // Simulate Progress Steps (OCR → Language → Segmentation → AI Classification)
    for (let i = 1; i < processingSteps.length; i++) {
      setCurrentStep(i);
      setProgress(((i + 1) / processingSteps.length) * 100);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate step processing delay
    }

    setIsProcessing(false);

    // Redirect to Analysis Page (Optional: pass document id or use a query param)
    // router.push(`/analysis/${data.documentId}`);
    alert('Document Processed Successfully!');  // For now show an alert

  } catch (error) {
    console.error(error);
    alert('An error occurred during processing');
    setIsProcessing(false);
  }
};

  const getStepStatus = (index: number): ProcessingStep["status"] => {
    if (index < currentStep) return "completed"
    if (index === currentStep && isProcessing) return "processing"
    if (index > currentStep) return "pending"
    return "pending"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/">← Back to Dashboard</Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Document Upload & Processing</h1>
                <p className="text-sm text-gray-600">Upload legal documents for AI-powered analysis</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Document Upload
                </CardTitle>
                <CardDescription>
                  Upload PDF or DOCX files for analysis. Supports OCR for scanned documents.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => document.getElementById("file-input")?.click()}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">Drop files here or click to browse</p>
                  <p className="text-sm text-gray-500 mb-4">Supports PDF, DOCX files up to 50MB</p>
                  <input
                    id="file-input"
                    type="file"
                    multiple
                    accept=".pdf,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button variant="outline">Choose Files</Button>
                </div>

                {files.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-medium mb-3">Selected Files:</h3>
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 text-blue-500 mr-3" />
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          </div>
                          <Badge variant="secondary">Ready</Badge>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full mt-4" onClick={startProcessing} disabled={isProcessing}>
                      {isProcessing ? "Processing..." : "Start Analysis"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Processing Steps */}
            {(isProcessing || progress > 0) && (
              <Card>
                <CardHeader>
                  <CardTitle>Processing Pipeline</CardTitle>
                  <CardDescription>AI-powered document analysis in progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  <div className="space-y-4">
                    {processingSteps.map((step, index) => {
                      const status = getStepStatus(index)
                      const Icon = step.icon

                      return (
                        <div key={step.id} className="flex items-center space-x-4">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              status === "completed"
                                ? "bg-green-100 text-green-600"
                                : status === "processing"
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {status === "completed" ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : status === "processing" ? (
                              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Icon className="w-5 h-5" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{step.name}</p>
                            <p className="text-sm text-gray-500">{step.description}</p>
                          </div>
                          <Badge
                            variant={
                              status === "completed" ? "default" : status === "processing" ? "secondary" : "outline"
                            }
                          >
                            {status === "completed" ? "Done" : status === "processing" ? "Processing" : "Pending"}
                          </Badge>
                        </div>
                      )
                    })}
                  </div>

                  {progress === 100 && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        <span className="font-medium text-green-800">Processing Complete!</span>
                      </div>
                      <p className="text-sm text-green-700 mt-1">
                        Your document has been successfully analyzed. View results in the analysis dashboard.
                      </p>
                      <Button className="mt-3" asChild>
                        <Link href="/analysis">View Analysis Results</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Processing Capabilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">OCR Processing</p>
                    <p className="text-sm text-gray-600">Extract text from scanned documents</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Languages className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Language Detection</p>
                    <p className="text-sm text-gray-600">Automatic language identification</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Scissors className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Smart Segmentation</p>
                    <p className="text-sm text-gray-600">BERT-powered clause detection</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Brain className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium">AI Classification</p>
                    <p className="text-sm text-gray-600">Legal-BERT clause labeling</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Supported Formats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">PDF Documents</span>
                    <Badge variant="secondary">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">DOCX Files</span>
                    <Badge variant="secondary">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Scanned Documents</span>
                    <Badge variant="secondary">✓ OCR</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Multi-language</span>
                    <Badge variant="secondary">✓</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Uploads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Service Agreement.pdf</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">NDA Template.docx</p>
                      <p className="text-xs text-gray-500">5 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <Clock className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Lease Contract.pdf</p>
                      <p className="text-xs text-gray-500">Processing...</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
