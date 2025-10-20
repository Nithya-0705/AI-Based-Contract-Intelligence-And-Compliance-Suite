// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { GitCompare, FileText, Plus, Minus, Equal, Eye, Download } from "lucide-react"

// export default function ComparePage() {
//   const comparisons = [
//     {
//       id: 1,
//       document1: "Service Agreement v1.0.pdf",
//       document2: "Service Agreement v2.0.pdf",
//       similarity: 87,
//       changes: {
//         additions: 12,
//         deletions: 8,
//         modifications: 15,
//       },
//       date: "2024-01-15",
//       status: "completed",
//     },
//     {
//       id: 2,
//       document1: "Employment Contract - Original.docx",
//       document2: "Employment Contract - Revised.docx",
//       similarity: 92,
//       changes: {
//         additions: 5,
//         deletions: 3,
//         modifications: 7,
//       },
//       date: "2024-01-14",
//       status: "completed",
//     },
//   ]

//   const changeTypes = [
//     {
//       type: "Additions",
//       count: 47,
//       icon: Plus,
//       color: "text-green-600 bg-green-100",
//     },
//     {
//       type: "Deletions",
//       count: 23,
//       icon: Minus,
//       color: "text-red-600 bg-red-100",
//     },
//     {
//       type: "Modifications",
//       count: 89,
//       icon: Equal,
//       color: "text-blue-600 bg-blue-100",
//     },
//   ]

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Contract Comparison</h1>
//           <p className="text-gray-600 mt-1">Version diff with semantic similarity matching</p>
//         </div>
//         <Button>
//           <GitCompare className="w-4 h-4 mr-2" />
//           New Comparison
//         </Button>
//       </div>

//       {/* Comparison Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Comparisons</p>
//                 <p className="text-2xl font-bold text-gray-900">1,247</p>
//               </div>
//               <GitCompare className="h-8 w-8 text-blue-600" />
//             </div>
//           </CardContent>
//         </Card>

//         {changeTypes.map((change, index) => (
//           <Card key={index}>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">{change.type}</p>
//                   <p className="text-2xl font-bold text-gray-900">{change.count}</p>
//                 </div>
//                 <change.icon className={`h-8 w-8 ${change.color.split(" ")[0]}`} />
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Start New Comparison */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Start New Comparison</CardTitle>
//           <CardDescription>Compare two documents to identify changes and similarities</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//               <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//               <h3 className="font-medium text-gray-900 mb-2">Original Document</h3>
//               <p className="text-sm text-gray-600 mb-4">Select the base version for comparison</p>
//               <Button variant="outline">Choose File</Button>
//             </div>

//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//               <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//               <h3 className="font-medium text-gray-900 mb-2">Revised Document</h3>
//               <p className="text-sm text-gray-600 mb-4">Select the updated version to compare</p>
//               <Button variant="outline">Choose File</Button>
//             </div>
//           </div>

//           <div className="mt-6 text-center">
//             <Button className="bg-blue-600 hover:bg-blue-700" disabled>
//               <GitCompare className="w-4 h-4 mr-2" />
//               Start Comparison
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Recent Comparisons */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Recent Comparisons</CardTitle>
//           <CardDescription>Latest document comparison results</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {comparisons.map((comparison) => (
//               <div key={comparison.id} className="border rounded-lg p-4">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                       <GitCompare className="w-5 h-5 text-blue-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-medium text-gray-900">Document Comparison</h3>
//                       <p className="text-sm text-gray-500">{comparison.date}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Badge variant="secondary" className="bg-green-100 text-green-800">
//                       {comparison.similarity}% Similar
//                     </Badge>
//                     <Button variant="ghost" size="sm">
//                       <Eye className="w-4 h-4" />
//                     </Button>
//                     <Button variant="ghost" size="sm">
//                       <Download className="w-4 h-4" />
//                     </Button>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <p className="text-sm font-medium text-gray-700 mb-1">Original</p>
//                     <p className="text-sm text-gray-600">{comparison.document1}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-700 mb-1">Revised</p>
//                     <p className="text-sm text-gray-600">{comparison.document2}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-6">
//                   <div className="flex items-center space-x-2">
//                     <Plus className="w-4 h-4 text-green-600" />
//                     <span className="text-sm text-gray-600">{comparison.changes.additions} additions</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Minus className="w-4 h-4 text-red-600" />
//                     <span className="text-sm text-gray-600">{comparison.changes.deletions} deletions</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Equal className="w-4 h-4 text-blue-600" />
//                     <span className="text-sm text-gray-600">{comparison.changes.modifications} modifications</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GitCompare, FileText, Plus, Minus, Equal, Eye, Download } from "lucide-react"

export default function ComparePage() {
  const [file1, setFile1] = useState<File | null>(null)
  const [file2, setFile2] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: any) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
    }
  }

  const uploadDoc = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("http://localhost:5000/api/documents/upload", {
      method: "POST",
      body: formData,
    })

    if (!res.ok) throw new Error("File upload failed")
    const data = await res.json()
    return data.documentId
  }

  const startComparison = async () => {
    if (!file1 || !file2) return
    setLoading(true)
    try {
      // 1. Upload both docs
      const [docId1, docId2] = await Promise.all([uploadDoc(file1), uploadDoc(file2)])

      // 2. Call compare API
      const res = await fetch("http://localhost:5000/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId1: docId1,
          documentId2: docId2,
          topK: 3,
        }),
      })

      if (!res.ok) throw new Error("Comparison request failed")
      const data = await res.json()
      setResults(data.comparisons)
    } catch (err) {
      console.error("Comparison failed", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contract Comparison</h1>
          <p className="text-gray-600 mt-1">Version diff with semantic similarity matching</p>
        </div>
      </div>

      {/* Start New Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Start New Comparison</CardTitle>
          <CardDescription>Compare two documents to identify changes and similarities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">Original Document</h3>
              <input type="file" onChange={(e) => handleFileChange(e, setFile1)} />
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">Revised Document</h3>
              <input type="file" onChange={(e) => handleFileChange(e, setFile2)} />
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!file1 || !file2 || loading}
              onClick={startComparison}
            >
              <GitCompare className="w-4 h-4 mr-2" />
              {loading ? "Comparing..." : "Start Comparison"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Comparison Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((item, idx) => (
                <div key={idx} className="border rounded-lg p-4">
                  <p className="font-medium text-gray-900">Clause:</p>
                  <p className="text-sm text-gray-700 mb-2">{item.clause}</p>
                  <div className="space-y-2">
                    {item.matches.map((m: any, j: number) => (
                      <div key={j} className="p-2 border rounded bg-gray-50">
                        <p className="text-sm text-gray-600">{m.content}</p>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 mt-1">
                          Similarity: {(m.similarity * 100).toFixed(1)}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
