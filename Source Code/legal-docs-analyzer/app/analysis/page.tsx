"use client";


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, BarChart3, TrendingUp, Eye, Download } from "lucide-react"
import { useState ,useEffect} from "react";

export default function AnalysisPage() {
  // const analyses = [
  //   {
  //     id: 1,
  //     document: "Service Agreement - TechCorp.pdf",
  //     clauses: 47,
  //     categories: ["Payment Terms", "Liability", "Termination", "IP Rights"],
  //     confidence: 94,
  //     date: "2024-01-15",
  //     status: "completed",
  //   },
  //   {
  //     id: 2,
  //     document: "Employment Contract - Jane Doe.docx",
  //     clauses: 23,
  //     categories: ["Compensation", "Benefits", "Confidentiality"],
  //     confidence: 97,
  //     date: "2024-01-14",
  //     status: "completed",
  //   },
  //   {
  //     id: 3,
  //     document: "Lease Agreement - Office Space.pdf",
  //     clauses: 31,
  //     categories: ["Rent", "Maintenance", "Insurance", "Termination"],
  //     confidence: 91,
  //     date: "2024-01-13",
  //     status: "completed",
  //   },
  // ]

  type Analysis = {
    id: number;
    document: string;
    clauses: number;
    categories: string[];
    confidence: number;
    date: string;
    status?: string;
  };

  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchAnalyses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/documents/analyses");
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setAnalyses(data);
    } catch (err) {
      console.error("Error fetching analyses:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchAnalyses();
}, []);


  

  if (loading) {
    return <p>Loading analyses...</p>;
  }
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clause Analysis</h1>
          <p className="text-gray-600 mt-1">AI-powered clause segmentation and classification</p>
        </div>
        <Button>
          <BarChart3 className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clauses</p>
                <p className="text-2xl font-bold text-gray-900">156,392</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <div className="mt-2 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+18% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Confidence</p>
                <p className="text-2xl font-bold text-gray-900">94.2%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-2 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+2.1% accuracy</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">47</p>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-600">Legal domains covered</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processing Time</p>
                <p className="text-2xl font-bold text-gray-900">2.3s</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-600">Avg per document</span>
            </div>
          </CardContent>
        </Card>
      </div> */}

      {/* Analysis Results */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Analysis Results</CardTitle>
          <CardDescription>Latest clause classification and segmentation results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyses.map((analysis) => (
              <div key={analysis.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{analysis.document}</h3>
                      <p className="text-sm text-gray-500">{analysis.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {analysis.confidence}% Confidence
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Clauses Identified</p>
                    <p className="text-2xl font-bold text-blue-600">{analysis.clauses}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Categories</p>
                    <div className="flex flex-wrap gap-1">
                      {analysis.categories.map((category, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
