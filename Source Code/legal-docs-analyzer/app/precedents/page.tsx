import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Scale, Search, BookOpen, Calendar, MapPin, ExternalLink, Filter } from "lucide-react"

export default function PrecedentsPage() {
  const cases = [
    {
      id: 1,
      title: "Smith v. TechCorp Inc.",
      court: "Supreme Court of California",
      date: "2023-08-15",
      jurisdiction: "California",
      relevance: 95,
      summary:
        "Landmark case establishing liability limits for software service agreements. Court ruled that liability caps must be reasonable in relation to contract value.",
      tags: ["Liability", "Software", "Service Agreement"],
      citation: "2023 Cal. LEXIS 4567",
    },
    {
      id: 2,
      title: "DataFlow Systems v. Enterprise Solutions",
      court: "U.S. Court of Appeals, 9th Circuit",
      date: "2023-06-22",
      jurisdiction: "Federal",
      relevance: 88,
      summary:
        "Important precedent on intellectual property clauses in technology contracts. Established standards for IP ownership in custom software development.",
      tags: ["IP Rights", "Software Development", "Custom Work"],
      citation: "2023 U.S. App. LEXIS 3421",
    },
    {
      id: 3,
      title: "Global Services Ltd. v. Regional Bank",
      court: "New York Supreme Court",
      date: "2023-04-10",
      jurisdiction: "New York",
      relevance: 82,
      summary:
        "Significant ruling on termination clauses in financial services contracts. Court emphasized the importance of clear notice requirements and cure periods.",
      tags: ["Termination", "Financial Services", "Notice Requirements"],
      citation: "2023 N.Y. LEXIS 2156",
    },
    {
      id: 4,
      title: "Innovation Labs v. StartupCorp",
      court: "Delaware Court of Chancery",
      date: "2023-02-28",
      jurisdiction: "Delaware",
      relevance: 79,
      summary:
        "Key decision on confidentiality and non-disclosure provisions. Established boundaries for reasonable confidentiality terms in business partnerships.",
      tags: ["Confidentiality", "NDA", "Business Partnership"],
      citation: "2023 Del. Ch. LEXIS 1834",
    },
  ]

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 90) return "bg-green-100 text-green-800"
    if (relevance >= 80) return "bg-yellow-100 text-yellow-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Case Law Search</h1>
          <p className="text-gray-600 mt-1">Precedent and case law retrieval system</p>
        </div>
        <Button>
          <BookOpen className="w-4 h-4 mr-2" />
          Advanced Search
        </Button>
      </div>

      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle>Search Legal Precedents</CardTitle>
          <CardDescription>Find relevant case law and legal precedents for your documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input placeholder="Search cases, courts, or legal concepts..." className="w-full" />
            </div>
            <Button>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline">Liability</Badge>
            <Badge variant="outline">IP Rights</Badge>
            <Badge variant="outline">Termination</Badge>
            <Badge variant="outline">Confidentiality</Badge>
            <Badge variant="outline">Service Agreement</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Search Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Cases</p>
                <p className="text-2xl font-bold text-gray-900">45,892</p>
              </div>
              <Scale className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Jurisdictions</p>
                <p className="text-2xl font-bold text-gray-900">52</p>
              </div>
              <MapPin className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recent Updates</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Search Results</p>
                <p className="text-2xl font-bold text-gray-900">127</p>
              </div>
              <Search className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Case Results */}
      <Card>
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
          <CardDescription>Relevant cases based on your current documents and search criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {cases.map((case_) => (
              <div key={case_.id} className="border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{case_.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Scale className="w-4 h-4" />
                        <span>{case_.court}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{case_.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{case_.jurisdiction}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getRelevanceColor(case_.relevance)}>{case_.relevance}% Relevant</Badge>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">{case_.summary}</p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {case_.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 font-mono">{case_.citation}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
