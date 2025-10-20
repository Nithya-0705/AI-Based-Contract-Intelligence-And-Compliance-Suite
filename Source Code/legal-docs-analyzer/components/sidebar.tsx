"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  FileText,
  Shield,
  GitCompare,
  MessageSquare,
  CheckSquare,
  Scale,
  Users,
  Settings,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  // {
  //   name: "Dashboard",
  //   href: "/",
  //   icon: Home,
  //   color: "text-blue-600",
  // },
  {
    name: "Document Upload",
    href: "/upload",
    icon: Upload,
    color: "text-blue-500",
    description: "Upload PDF/DOCX files with OCR",
  },
  {
    name: "Clause Analysis",
    href: "/analysis",
    icon: FileText,
    color: "text-green-500",
    description: "AI-powered clause segmentation",
  },
  {
    name: "Risk Assessment",
    href: "/risk",
    icon: Shield,
    color: "text-red-500",
    description: "Three-tier risk evaluation",
  },
  {
    name: "Contract Compare",
    href: "/compare",
    icon: GitCompare,
    color: "text-purple-500",
    description: "Version diff with semantic matching",
  },
  {
    name: "LawGPT Chat",
    href: "/chat",
    icon: MessageSquare,
    color: "text-orange-500",
    description: "Conversational document queries",
  },
  {
    name: "Case Law Search",
    href: "/precedents",
    icon: Scale,
    color: "text-indigo-500",
    description: "Precedent and case law retrieval",
  },
  {
    name: "Compliance Check",
    href: "/compliance",
    icon: CheckSquare,
    color: "text-teal-500",
    description: "Industry-specific requirements",
  },
  {
    name: "Feedback Loop",
    href: "/feedback",
    icon: Users,
    color: "text-pink-500",
    description: "Human-in-the-loop improvement",
  },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-72",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">LegalAnalyzer</h1>
                <p className="text-xs text-gray-600">AI-Powered Analysis</p>
              </div>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8 p-0">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        {!collapsed && (
          <div className="mt-3">
            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
              System Online
            </Badge>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              <item.icon className={cn("h-5 w-5 flex-shrink-0", item.color)} />
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{item.name}</div>
                  {item.description && <div className="text-xs text-gray-500 truncate">{item.description}</div>}
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      {/* {!collapsed && (
        <div className="p-4 border-t border-gray-200">
          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      )} */}
    </div>
  )
}
