"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, ThumbsDown } from "lucide-react"

interface DocumentItem {
  id: number
  filename: string
}

export default function FeedbackPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>([])
  const [selectedDoc, setSelectedDoc] = useState("")
  const [feedbackType, setFeedbackType] = useState("")
  const [comment, setComment] = useState("")
  const [alertMsg, setAlertMsg] = useState("")

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const res = await fetch("http://localhost:5000/api/documents")
        const data = await res.json()
        setDocuments(data)
      } catch (err) {
        console.error("Failed to fetch documents:", err)
      }
    }
    fetchDocuments()
  }, [])

  const handleSubmit = () => {
    if (!selectedDoc || !feedbackType || !comment.trim()) {
      setAlertMsg("Please select a document, feedback type, and provide comments.")
      return
    }

    setAlertMsg(`Your feedback for "${selectedDoc}" has been recorded.`)

    setSelectedDoc("")
    setFeedbackType("")
    setComment("")
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Provide Feedback</CardTitle>
          <CardDescription>Help improve our AI models</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {alertMsg && (
            <div className="mb-4 p-3 rounded bg-green-100 text-green-800 text-sm border border-green-300">
              {alertMsg}
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Document Analysis</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={selectedDoc}
              onChange={(e) => setSelectedDoc(e.target.value)}
            >
              <option value="">Select a document...</option>
              {documents.map((doc) => (
                <option key={doc.id} value={doc.filename}>
                  {doc.filename}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Feedback Type</label>
            <div className="flex space-x-2">
              <Button
                variant={feedbackType === "positive" ? "default" : "outline"}
                size="sm"
                className="flex-1"
                onClick={() => setFeedbackType("positive")}
              >
                <ThumbsUp className="w-4 h-4 mr-1" />
                Positive
              </Button>
              <Button
                variant={feedbackType === "negative" ? "default" : "outline"}
                size="sm"
                className="flex-1"
                onClick={() => setFeedbackType("negative")}
              >
                <ThumbsDown className="w-4 h-4 mr-1" />
                Negative
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Comments</label>
            <Textarea
              placeholder="Describe what was accurate or what could be improved..."
              className="min-h-[100px]"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={handleSubmit}>
            Submit Feedback
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
