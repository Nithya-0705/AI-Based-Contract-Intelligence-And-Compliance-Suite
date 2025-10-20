// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
// import { CheckSquare, AlertTriangle, XCircle, CheckCircle, FileText, Shield, Globe, Building } from "lucide-react"

// export default function CompliancePage() {
//   const complianceChecks = [
//     {
//       id: 1,
//       document: "Service Agreement - TechCorp.pdf",
//       framework: "GDPR",
//       score: 85,
//       status: "compliant",
//       issues: 2,
//       requirements: 12,
//       passed: 10,
//       date: "2024-01-15",
//     },
//     {
//       id: 2,
//       document: "Employment Contract - Jane Doe.docx",
//       framework: "SOX",
//       score: 92,
//       status: "compliant",
//       issues: 1,
//       requirements: 8,
//       passed: 7,
//       date: "2024-01-14",
//     },
//     {
//       id: 3,
//       document: "Data Processing Agreement.pdf",
//       framework: "CCPA",
//       score: 67,
//       status: "non-compliant",
//       issues: 5,
//       requirements: 15,
//       passed: 10,
//       date: "2024-01-13",
//     },
//   ]

//   const frameworks = [
//     {
//       name: "GDPR",
//       description: "General Data Protection Regulation",
//       icon: Globe,
//       color: "bg-blue-500",
//       documents: 45,
//       compliance: 78,
//     },
//     {
//       name: "SOX",
//       description: "Sarbanes-Oxley Act",
//       icon: Building,
//       color: "bg-green-500",
//       documents: 23,
//       compliance: 89,
//     },
//     {
//       name: "CCPA",
//       description: "California Consumer Privacy Act",
//       icon: Shield,
//       color: "bg-purple-500",
//       documents: 31,
//       compliance: 72,
//     },
//     {
//       name: "HIPAA",
//       description: "Health Insurance Portability Act",
//       icon: FileText,
//       color: "bg-red-500",
//       documents: 12,
//       compliance: 95,
//     },
//   ]

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "compliant":
//         return "bg-green-100 text-green-800"
//       case "non-compliant":
//         return "bg-red-100 text-red-800"
//       case "warning":
//         return "bg-yellow-100 text-yellow-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "compliant":
//         return CheckCircle
//       case "non-compliant":
//         return XCircle
//       case "warning":
//         return AlertTriangle
//       default:
//         return CheckSquare
//     }
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Compliance Checklist</h1>
//           <p className="text-gray-600 mt-1">Industry-specific regulatory requirements</p>
//         </div>
//         <Button>
//           <CheckSquare className="w-4 h-4 mr-2" />
//           New Compliance Check
//         </Button>
//       </div>

//       {/* Compliance Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Checks</p>
//                 <p className="text-2xl font-bold text-gray-900">2,847</p>
//               </div>
//               <CheckSquare className="h-8 w-8 text-blue-600" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Compliant</p>
//                 <p className="text-2xl font-bold text-green-600">2,234</p>
//               </div>
//               <CheckCircle className="h-8 w-8 text-green-600" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Issues Found</p>
//                 <p className="text-2xl font-bold text-red-600">156</p>
//               </div>
//               <XCircle className="h-8 w-8 text-red-600" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Avg Score</p>
//                 <p className="text-2xl font-bold text-gray-900">81%</p>
//               </div>
//               <Shield className="h-8 w-8 text-purple-600" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Compliance Frameworks */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Compliance Frameworks</CardTitle>
//           <CardDescription>Regulatory frameworks and their compliance status</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {frameworks.map((framework, index) => (
//               <Card key={index}>
//                 <CardContent className="p-4">
//                   <div className="flex items-center space-x-3 mb-3">
//                     <div className={`w-10 h-10 ${framework.color} rounded-lg flex items-center justify-center`}>
//                       <framework.icon className="w-5 h-5 text-white" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900">{framework.name}</h3>
//                       <p className="text-xs text-gray-600">{framework.description}</p>
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-600">Compliance</span>
//                       <span className="font-medium">{framework.compliance}%</span>
//                     </div>
//                     <Progress value={framework.compliance} className="h-2" />
//                     <p className="text-xs text-gray-500">{framework.documents} documents checked</p>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Recent Compliance Checks */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Recent Compliance Checks</CardTitle>
//           <CardDescription>Latest regulatory compliance assessments</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {complianceChecks.map((check) => {
//               const StatusIcon = getStatusIcon(check.status)
//               return (
//                 <div key={check.id} className="border rounded-lg p-4">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center space-x-3">
//                       <div
//                         className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(check.status)}`}
//                       >
//                         <StatusIcon className="w-5 h-5" />
//                       </div>
//                       <div>
//                         <h3 className="font-medium text-gray-900">{check.document}</h3>
//                         <p className="text-sm text-gray-500">
//                           {check.framework} Compliance Check • {check.date}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Badge className={getStatusColor(check.status)}>
//                         {check.status === "compliant" ? "Compliant" : "Non-Compliant"}
//                       </Badge>
//                       <Button variant="ghost" size="sm">
//                         View Details
//                       </Button>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div>
//                       <div className="flex justify-between text-sm mb-1">
//                         <span className="text-gray-600">Compliance Score</span>
//                         <span className="font-medium">{check.score}%</span>
//                       </div>
//                       <Progress value={check.score} className="h-2" />
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-gray-600">Requirements Met</span>
//                       <span className="font-medium">
//                         {check.passed}/{check.requirements}
//                       </span>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-gray-600">Issues Found</span>
//                       <div className="flex items-center space-x-1">
//                         {check.issues > 0 && <AlertTriangle className="w-4 h-4 text-red-500" />}
//                         <span className={`font-medium ${check.issues > 0 ? "text-red-600" : "text-green-600"}`}>
//                           {check.issues}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckSquare, AlertTriangle, XCircle, CheckCircle, FileText, Shield, Globe, Building } from "lucide-react"

interface ComplianceCheck {
  id: number
  documentId: number
  framework: string
  score: number
  requirements: number
  documentName: string
  passed: number
  issues: number
  details: any
  createdAt: string
  document?: {
    documentName: string
  }
}

export default function CompliancePage() {
  const [complianceChecks, setComplianceChecks] = useState<ComplianceCheck[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchChecks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/compliance") // 👈 adjust backend URL if needed
        if (!res.ok) throw new Error("Failed to fetch compliance checks")
        const data = await res.json()
        setComplianceChecks(data)
      } catch (err) {
        console.error("Error fetching compliance checks:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchChecks()
  }, [])

  // const frameworks = [
  //   {
  //     name: "GDPR",
  //     description: "General Data Protection Regulation",
  //     icon: Globe,
  //     color: "bg-blue-500",
  //     documents: 45,
  //     compliance: 78,
  //   },
  //   {
  //     name: "SOX",
  //     description: "Sarbanes-Oxley Act",
  //     icon: Building,
  //     color: "bg-green-500",
  //     documents: 23,
  //     compliance: 89,
  //   },
  //   {
  //     name: "CCPA",
  //     description: "California Consumer Privacy Act",
  //     icon: Shield,
  //     color: "bg-purple-500",
  //     documents: 31,
  //     compliance: 72,
  //   },
  //   {
  //     name: "HIPAA",
  //     description: "Health Insurance Portability Act",
  //     icon: FileText,
  //     color: "bg-red-500",
  //     documents: 12,
  //     compliance: 95,
  //   },
  // ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant":
        return "bg-green-100 text-green-800"
      case "non-compliant":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return CheckCircle
      case "non-compliant":
        return XCircle
      case "warning":
        return AlertTriangle
      default:
        return CheckSquare
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Compliance Checklist</h1>
          <p className="text-gray-600 mt-1">Industry-specific regulatory requirements</p>
        </div>
        <Button>
          <CheckSquare className="w-4 h-4 mr-2" />
          New Compliance Check
        </Button>
      </div>

      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Checks</p>
                <p className="text-2xl font-bold text-gray-900">{complianceChecks.length}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Compliant</p>
                <p className="text-2xl font-bold text-green-600">
                  {complianceChecks.filter((c) => c.score >= 80).length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Issues Found</p>
                <p className="text-2xl font-bold text-red-600">
                  {complianceChecks.reduce((sum, c) => sum + c.issues, 0)}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {complianceChecks.length > 0
                    ? Math.round(
                        complianceChecks.reduce((sum, c) => sum + c.score, 0) / complianceChecks.length
                      )
                    : 0}
                  %
                </p>
              </div>
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Compliance Checks */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Compliance Checks</CardTitle>
          <CardDescription>Latest regulatory compliance assessments</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-gray-500">Loading compliance checks...</p>
          ) : complianceChecks.length === 0 ? (
            <p className="text-gray-500">No compliance checks found</p>
          ) : (
            <div className="space-y-4">
              {complianceChecks.map((check) => {
                const status = check.score >= 80 ? "compliant" : "non-compliant"
                const StatusIcon = getStatusIcon(status)
                return (
                  <div key={check.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(status)}`}>
                          <StatusIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{check.documentName || "Unknown Document"}</h3>
                          <p className="text-sm text-gray-500">
                            {check.framework} Compliance Check •{" "}
                            {new Date(check.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(status)}>
                          {status === "compliant" ? "Compliant" : "Non-Compliant"}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Compliance Score</span>
                          <span className="font-medium">{check.score}%</span>
                        </div>
                        <Progress value={check.score} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Requirements Met</span>
                        <span className="font-medium">
                          {check.passed}/{check.requirements}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Issues Found</span>
                        <div className="flex items-center space-x-1">
                          {check.issues > 0 && <AlertTriangle className="w-4 h-4 text-red-500" />}
                          <span className={`font-medium ${check.issues > 0 ? "text-red-600" : "text-green-600"}`}>
                            {check.issues}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
