"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, AlertTriangle, CheckCircle, XCircle, TrendingUp, Eye, Download } from "lucide-react"
import { useState, useEffect } from "react";
type RiskDetail = {
  category: string;
  level: "High" | "Medium" | "Low" | string;
  score: number;
};

type DocumentRisk = {
  id: number;
  document: string;
  overallRisk: string;
  riskScore: number;
  risks: RiskDetail[];
  date: string;
  recommendations: number;
};

const getRiskColor = (level: string) => {
  switch (level) {
    case "High":
      return "text-red-600 bg-red-100";
    case "Medium":
      return "text-yellow-600 bg-yellow-100";
    case "Low":
      return "text-green-600 bg-green-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

const getRiskIcon = (level: string) => {
  switch (level) {
    case "High":
      return XCircle;
    case "Medium":
      return AlertTriangle;
    case "Low":
      return CheckCircle;
    default:
      return Shield;
  }
};
export default function RiskPage() {
  // const riskAssessments = [
  //   {
  //     id: 1,
  //     document: "Service Agreement - TechCorp.pdf",
  //     overallRisk: "Medium",
  //     riskScore: 65,
  //     risks: [
  //       { category: "Payment Terms", level: "High", score: 85 },
  //       { category: "Liability", level: "Medium", score: 60 },
  //       { category: "Termination", level: "Low", score: 25 },
  //     ],
  //     date: "2024-01-15",
  //     recommendations: 3,
  //   },
  //   {
  //     id: 2,
  //     document: "Employment Contract - Jane Doe.docx",
  //     overallRisk: "Low",
  //     riskScore: 35,
  //     risks: [
  //       { category: "Compensation", level: "Low", score: 20 },
  //       { category: "Benefits", level: "Low", score: 30 },
  //       { category: "Confidentiality", level: "Medium", score: 55 },
  //     ],
  //     date: "2024-01-14",
  //     recommendations: 1,
  //   },
  // ]

   const [risks, setRisks] = useState<DocumentRisk[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchRisks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/documents/analyses");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const mappedData = data.map((doc: any, index: number) => ({
        id: doc.id,
        document: doc.document,
        overallRisk: doc.overallRisk || "Medium", // fallback
        riskScore: doc.riskScore || Math.round((doc.confidence || 0) * 100),
        risks: doc.riskDetails || [
          { category: "Example Category", level: "Medium", score: 50 },
        ],
        date: doc.date || new Date().toISOString().split("T")[0],
        recommendations: doc.recommendations || 0,
      }));

      setRisks(mappedData);
    } catch (err) {
      console.error("Failed to fetch risks:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchRisks();
}, []);


  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Risk Assessment</h1>
          <p className="text-gray-600 mt-1">Three-tier risk evaluation with ML ensemble</p>
        </div>
        <Button>
          <Shield className="w-4 h-4 mr-2" />
          New Assessment
        </Button>
      </div>

      {/* Risk Overview Stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Assessments</p>
                <p className="text-2xl font-bold text-gray-900">8,934</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <div className="mt-2 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+31% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Risk</p>
                <p className="text-2xl font-bold text-red-600">234</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-600">2.6% of total</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Medium Risk</p>
                <p className="text-2xl font-bold text-yellow-600">1,456</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-600">16.3% of total</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Risk</p>
                <p className="text-2xl font-bold text-green-600">7,244</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-600">81.1% of total</span>
            </div>
          </CardContent>
        </Card>
      </div> */}

      {/* Risk Assessment Results */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Risk Assessments</CardTitle>
          <CardDescription>Latest risk evaluation results with detailed breakdowns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* {riskAssessments.map((assessment) => {
              const RiskIcon = getRiskIcon(assessment.overallRisk)
              return (
                <div key={assessment.id} className="border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${getRiskColor(assessment.overallRisk)}`}
                      >
                        <RiskIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{assessment.document}</h3>
                        <p className="text-sm text-gray-500">{assessment.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getRiskColor(assessment.overallRisk)}>{assessment.overallRisk} Risk</Badge>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Overall Risk Score</span>
                        <span className="text-sm font-bold">{assessment.riskScore}/100</span>
                      </div>
                      <Progress value={assessment.riskScore} className="h-3 mb-4" />

                      <div className="text-sm text-gray-600">
                        <p className="mb-1">{assessment.recommendations} recommendations available</p>
                        <Button variant="link" className="p-0 h-auto text-blue-600">
                          View detailed analysis →
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Risk Breakdown</h4>
                      <div className="space-y-2">
                        {assessment.risks.map((risk, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{risk.category}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    risk.level === "High"
                                      ? "bg-red-500"
                                      : risk.level === "Medium"
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                  }`}
                                  style={{ width: `${risk.score}%` }}
                                ></div>
                              </div>
                              <Badge variant="outline" className={`text-xs ${getRiskColor(risk.level)}`}>
                                {risk.level}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })} */}

            {risks.map((assessment) => {
  const RiskIcon = getRiskIcon(assessment.overallRisk)
  return (
    <div key={assessment.id} className="border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${getRiskColor(
              assessment.overallRisk
            )}`}
          >
            <RiskIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{assessment.document}</h3>
            <p className="text-sm text-gray-500">{assessment.date}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className={getRiskColor(assessment.overallRisk)}>
            {assessment.overallRisk} Risk
          </Badge>
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Risk Score</span>
            <span className="text-sm font-bold">{assessment.riskScore}/100</span>
          </div>
          <Progress value={assessment.riskScore} className="h-3 mb-4" />

          <div className="text-sm text-gray-600">
            <p className="mb-1">{assessment.recommendations} recommendations available</p>
            <Button variant="link" className="p-0 h-auto text-blue-600">
              View detailed analysis →
            </Button>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Risk Breakdown</h4>
          <div className="space-y-2">
            {assessment.risks.map((risk, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{risk.category}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        risk.level === "High"
                          ? "bg-red-500"
                          : risk.level === "Medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${risk.score}%` }}
                    ></div>
                  </div>
                  <Badge variant="outline" className={`text-xs ${getRiskColor(risk.level)}`}>
                    {risk.level}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})}

          </div>
        </CardContent>
      </Card>
    </div>
  )
}
