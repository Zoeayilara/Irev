"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts'

const performanceData = [
    { stage: 'Stage 1', score: 65 },
    { stage: 'Stage 2', score: 78 },
    { stage: 'Stage 3', score: 92 },
    { stage: 'Finale', score: 88 },
];

const subjectData = [
    { subject: 'Mathematics', score: 85, fullMark: 100 },
    { subject: 'English', score: 70, fullMark: 100 },
    { subject: 'Logic', score: 95, fullMark: 100 },
    { subject: 'Gen. Knowledge', score: 60, fullMark: 100 },
    { subject: 'Science', score: 80, fullMark: 100 },
];

export default function AnalyticsCharts() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <Card className="border-none shadow-sm bg-white rounded-2xl">
                <CardHeader className="border-b border-slate-100 pb-4">
                    <CardTitle className="text-lg font-bold text-slate-800">Performance History</CardTitle>
                    <p className="text-sm text-slate-500">Progress across examination stages</p>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={performanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="stage" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dx={-10} domain={[0, 100]} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ stroke: '#F1F5F9', strokeWidth: 2 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#FFD700"
                                    strokeWidth={3}
                                    dot={{ r: 6, fill: '#0A192F', strokeWidth: 2, stroke: '#FFD700' }}
                                    activeDot={{ r: 8, fill: '#FFD700', stroke: '#0A192F' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white rounded-2xl">
                <CardHeader className="border-b border-slate-100 pb-4">
                    <CardTitle className="text-lg font-bold text-slate-800">Subject Strength Index</CardTitle>
                    <p className="text-sm text-slate-500">Multidimensional skill evaluation</p>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={subjectData}>
                                <PolarGrid stroke="#E2E8F0" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    name="Student"
                                    dataKey="score"
                                    stroke="#0A192F"
                                    strokeWidth={2}
                                    fill="#0A192F"
                                    fillOpacity={0.1}
                                />
                                <Radar
                                    name="Average"
                                    dataKey="fullMark"
                                    stroke="#FFD700"
                                    strokeWidth={2}
                                    fill="transparent"
                                    strokeDasharray="5 5"
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
