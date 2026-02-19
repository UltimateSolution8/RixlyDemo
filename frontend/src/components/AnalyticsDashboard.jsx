import React from 'react';
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
    PieChart, Pie, Cell
} from 'recharts';
import {
    Users, MessageSquare, Target, TrendingUp, ArrowUpRight, ArrowDownRight,
    Search, Filter, Calendar, Zap, AlertCircle, CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const leadData = [
    { name: 'Mon', leads: 45, sentiment: 75, volume: 120 },
    { name: 'Tue', leads: 52, sentiment: 82, volume: 140 },
    { name: 'Wed', leads: 38, sentiment: 68, volume: 110 },
    { name: 'Thu', leads: 65, sentiment: 91, volume: 180 },
    { name: 'Fri', leads: 48, sentiment: 78, volume: 135 },
    { name: 'Sat', leads: 32, sentiment: 85, volume: 90 },
    { name: 'Sun', leads: 28, sentiment: 88, volume: 85 },
];

const subreddits = [
    { name: 'r/SaaS', count: 142, conversion: 12.5 },
    { name: 'r/startups', count: 98, conversion: 10.2 },
    { name: 'r/marketing', count: 76, conversion: 8.4 },
    { name: 'r/entrepreneur', count: 115, conversion: 9.1 },
    { name: 'r/SideProject', count: 64, conversion: 14.8 },
];

const COLORS = ['#0D9488', '#14B8A6', '#2DD4BF', '#5EEAD4', '#99F6E4'];

const AnalyticsDashboard = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-[#F1F5F9] p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Button variant="ghost" size="sm" onClick={onBack} className="p-0 h-auto hover:bg-transparent text-[#64748B]">
                                ← Back to Landing
                            </Button>
                        </div>
                        <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Reddit Lead Analytics</h1>
                        <p className="text-[#64748B] text-lg">Real-time performance tracking for Rixly agent</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="gap-2">
                            <Calendar className="w-4 h-4" />
                            Last 7 Days
                        </Button>
                        <Button className="gap-2 bg-primary-gradient text-white border-none">
                            <Zap className="w-4 h-4" />
                            Generate Report
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div className="p-2 bg-[#ECFEFF] rounded-lg">
                                    <Target className="w-6 h-6 text-[#0D9488]" />
                                </div>
                                <div className="flex items-center text-[#22C55E] text-sm font-medium">
                                    <ArrowUpRight className="w-4 h-4" />
                                    +12.5%
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-[#64748B] text-sm font-medium">Total Leads</p>
                                <h3 className="text-2xl font-bold text-[#0F172A]">1,284</h3>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div className="p-2 bg-[#ECFEFF] rounded-lg">
                                    <MessageSquare className="w-6 h-6 text-[#14B8A6]" />
                                </div>
                                <div className="flex items-center text-[#22C55E] text-sm font-medium">
                                    <ArrowUpRight className="w-4 h-4" />
                                    +8.2%
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-[#64748B] text-sm font-medium">Engagements</p>
                                <h3 className="text-2xl font-bold text-[#0F172A]">4,852</h3>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div className="p-2 bg-[#ECFEFF] rounded-lg">
                                    <TrendingUp className="w-6 h-6 text-[#0D9488]" />
                                </div>
                                <div className="flex items-center text-[#22C55E] text-sm font-medium">
                                    <ArrowUpRight className="w-4 h-4" />
                                    +5.4%
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-[#64748B] text-sm font-medium">Conversion Rate</p>
                                <h3 className="text-2xl font-bold text-[#0F172A]">14.2%</h3>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div className="p-2 bg-[#ECFEFF] rounded-lg">
                                    <Users className="w-6 h-6 text-[#14B8A6]" />
                                </div>
                                <div className="flex items-center text-[#64748B] text-sm font-medium">
                                    <TrendingUp className="w-4 h-4" />
                                    Stable
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-[#64748B] text-sm font-medium">Active Agents</p>
                                <h3 className="text-2xl font-bold text-[#0F172A]">12</h3>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle>Lead Generation Trend</CardTitle>
                            <CardDescription>Daily lead acquisition over the past week</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={leadData}>
                                        <defs>
                                            <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#0D9488" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#64748B', fontSize: 12 }}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#64748B', fontSize: 12 }}
                                        />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 10px 25px rgba(15, 23, 42, 0.05)' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="leads"
                                            stroke="#0D9488"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorLeads)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle>Top Performing Subreddits</CardTitle>
                            <CardDescription>Distribution of leads across communities</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={subreddits} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                                        <XAxis type="number" hide />
                                        <YAxis
                                            dataKey="name"
                                            type="category"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#0F172A', fontSize: 12, fontWeight: 500 }}
                                            width={100}
                                        />
                                        <Tooltip
                                            cursor={{ fill: '#F1F5F9' }}
                                            contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 10px 25px rgba(15, 23, 42, 0.05)' }}
                                        />
                                        <Bar
                                            dataKey="count"
                                            radius={[0, 4, 4, 0]}
                                            barSize={20}
                                        >
                                            {subreddits.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity & Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Recent High-Intent Leads</CardTitle>
                                <CardDescription>Latest mentions identified as leads by AI</CardDescription>
                            </div>
                            <Button variant="outline" size="sm">View All</Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[1, 2, 3].map((_, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
                                        <div className="mt-1">
                                            <div className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center font-bold text-[#0D9488]">
                                                R
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className="font-semibold text-[#0F172A]">u/GrowthHacker99</h4>
                                                <Badge variant="success">High Intent</Badge>
                                            </div>
                                            <p className="text-sm text-[#334155] line-clamp-2 mb-2">
                                                "I'm looking for a tool that can automate my Reddit outreach. Currently doing it manually and it's taking too long. Any recommendations?"
                                            </p>
                                            <div className="flex items-center gap-4 text-xs text-[#64748B]">
                                                <span className="flex items-center gap-1"><Search className="w-3 h-3" /> r/SaaS</span>
                                                <span>2 hours ago</span>
                                                <span className="text-[#0D9488] font-medium">Automatic reply sent</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Agent Status</CardTitle>
                            <CardDescription>Health and performance metrics</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#334155]">API Health</span>
                                    <span className="text-[#22C55E] flex items-center gap-1 font-medium">
                                        <CheckCircle2 className="w-3 h-3" /> 99.9%
                                    </span>
                                </div>
                                <div className="w-full bg-[#E2E8F0] rounded-full h-2">
                                    <div className="bg-[#22C55E] h-2 rounded-full" style={{ width: '99.9%' }}></div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#334155]">Spam Protection</span>
                                    <span className="text-[#0D9488] font-medium">Optimal</span>
                                </div>
                                <div className="w-full bg-[#E2E8F0] rounded-full h-2">
                                    <div className="bg-[#14B8A6] h-2 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-[#E2E8F0]">
                                <h4 className="text-sm font-semibold text-[#0F172A] mb-3">System Notifications</h4>
                                <div className="space-y-3">
                                    <div className="flex gap-2 text-xs text-[#334155]">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#0D9488] mt-1 shrink-0"></div>
                                        <p>New subreddit added: r/indiehackers</p>
                                    </div>
                                    <div className="flex gap-2 text-xs text-[#334155]">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#0D9488] mt-1 shrink-0"></div>
                                        <p>Sentiment analysis engine updated to v2.4</p>
                                    </div>
                                    <div className="flex gap-2 text-xs text-[#334155]">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#64748B] mt-1 shrink-0"></div>
                                        <p>Weekly report is ready for download</p>
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full mt-2 variant-outline border-[#E2E8F0] hover:bg-[#ECFEFF]">
                                Configure AI Agent
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
