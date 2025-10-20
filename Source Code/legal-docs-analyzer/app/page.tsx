
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import {
//   Upload,
//   FileText,
//   Shield,
//   GitCompare,
//   MessageSquare,
//   CheckSquare,
//   Users,
//   BarChart3,
//   TrendingUp,
//   Clock,
//   AlertTriangle,
// } from "lucide-react"
// import Link from "next/link"

// export default function DashboardPage() {
//   const stats = [
//     {
//       label: "Documents Processed",
//       value: "12,847",
//       change: "+23%",
//       icon: FileText,
//       color: "text-blue-600",
//     },
//     {
//       label: "Clauses Analyzed",
//       value: "156,392",
//       change: "+18%",
//       icon: BarChart3,
//       color: "text-green-600",
//     },
//     {
//       label: "Risk Assessments",
//       value: "8,934",
//       change: "+31%",
//       icon: Shield,
//       color: "text-red-600",
//     },
//     {
//       label: "Active Users",
//       value: "247",
//       change: "+12%",
//       icon: Users,
//       color: "text-purple-600",
//     },
//   ]

//   const recentActivity = [
//     {
//       id: 1,
//       action: "Contract Analysis Completed",
//       document: "Service Agreement - TechCorp.pdf",
//       time: "2 minutes ago",
//       status: "completed",
//       risk: "Medium",
//     },
//     {
//       id: 2,
//       action: "Risk Assessment Generated",
//       document: "Employment Contract - Jane Doe.docx",
//       time: "15 minutes ago",
//       status: "completed",
//       risk: "Low",
//     },
//     {
//       id: 3,
//       action: "Document Upload",
//       document: "Lease Agreement - Office Space.pdf",
//       time: "1 hour ago",
//       status: "processing",
//       risk: "Pending",
//     },
//     {
//       id: 4,
//       action: "Compliance Check",
//       document: "Privacy Policy - Updated.docx",
//       time: "2 hours ago",
//       status: "completed",
//       risk: "High",
//     },
//   ]

//   const quickActions = [
//     {
//       title: "Upload New Document",
//       description: "Start analyzing a new legal document",
//       href: "/upload",
//       icon: Upload,
//       color: "bg-blue-500",
//     },
//     {
//       title: "Run Risk Assessment",
//       description: "Evaluate contract risks and compliance",
//       href: "/risk",
//       icon: Shield,
//       color: "bg-red-500",
//     },
//     {
//       title: "Compare Contracts",
//       description: "Analyze differences between documents",
//       href: "/compare",
//       icon: GitCompare,
//       color: "bg-purple-500",
//     },
//     {
//       title: "Ask LawGPT",
//       description: "Get instant answers about your documents",
//       href: "/chat",
//       icon: MessageSquare,
//       color: "bg-orange-500",
//     },
//   ]

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
//           <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your legal documents.</p>
//         </div>
//         <div className="flex space-x-3">
//           <Button variant="outline">
//             <BarChart3 className="w-4 h-4 mr-2" />
//             View Reports
//           </Button>
//           <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
//             <Upload className="w-4 h-4 mr-2" />
//             Upload Document
//           </Button>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, index) => (
//           <Card key={index}>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">{stat.label}</p>
//                   <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//                 </div>
//                 <stat.icon className={`h-8 w-8 ${stat.color}`} />
//               </div>
//               <div className="mt-4 flex items-center">
//                 <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
//                 <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
//                   {stat.change}
//                 </Badge>
//                 <span className="text-xs text-gray-500 ml-2">vs last month</span>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Quick Actions */}
//         <div className="lg:col-span-1">
//           <Card>
//             <CardHeader>
//               <CardTitle>Quick Actions</CardTitle>
//               <CardDescription>Common tasks to get you started</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {quickActions.map((action, index) => (
//                 <Link key={index} href={action.href}>
//                   <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
//                     <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
//                       <action.icon className="w-5 h-5 text-white" />
//                     </div>
//                     <div className="flex-1">
//                       <p className="font-medium text-sm">{action.title}</p>
//                       <p className="text-xs text-gray-500">{action.description}</p>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Recent Activity */}
//         <div className="lg:col-span-2">
//           <Card>
//             <CardHeader>
//               <CardTitle>Recent Activity</CardTitle>
//               <CardDescription>Latest document processing and analysis results</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {recentActivity.map((activity) => (
//                   <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg border">
//                     <div className="flex-shrink-0">
//                       {activity.status === "completed" ? (
//                         <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                           <CheckSquare className="w-4 h-4 text-green-600" />
//                         </div>
//                       ) : (
//                         <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
//                           <Clock className="w-4 h-4 text-yellow-600" />
//                         </div>
//                       )}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm font-medium text-gray-900">{activity.action}</p>
//                       <p className="text-sm text-gray-500 truncate">{activity.document}</p>
//                       <p className="text-xs text-gray-400">{activity.time}</p>
//                     </div>
//                     <div className="flex-shrink-0">
//                       <Badge
//                         variant={
//                           activity.risk === "High"
//                             ? "destructive"
//                             : activity.risk === "Medium"
//                               ? "default"
//                               : "secondary"
//                         }
//                         className="text-xs"
//                       >
//                         {activity.risk === "High" && <AlertTriangle className="w-3 h-3 mr-1" />}
//                         {activity.risk}
//                       </Badge>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* Technology Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <div className="w-8 h-8 bg-blue-500 rounded mr-3"></div>
//               Legal-BERT Classification
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-gray-600 text-sm">
//               Fine-tuned transformer models for accurate legal clause classification with reinforcement learning
//               optimization.
//             </p>
//             <div className="mt-3">
//               <Badge variant="secondary">98.7% Accuracy</Badge>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <div className="w-8 h-8 bg-green-500 rounded mr-3"></div>
//               Vector Search & RAG
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-gray-600 text-sm">
//               Semantic search with vector embeddings and retrieval-augmented generation for intelligent document Q&A.
//             </p>
//             <div className="mt-3">
//               <Badge variant="secondary">Sub-second Response</Badge>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <div className="w-8 h-8 bg-purple-500 rounded mr-3"></div>
//               Ensemble Risk Models
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-gray-600 text-sm">
//               Multi-model risk assessment combining rule-based systems, gradient boosting, and LLM scoring.
//             </p>
//             <div className="mt-3">
//               <Badge variant="secondary">95% Precision</Badge>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
// ...existing code...

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/upload")
  }, [router])

  // Optionally, you can return null or a loading spinner while redirecting
  return null
}