import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

const DashboardChart = () => {
    return (
        <div className="card border-0 shadow-sm p-4">
            <h5 className="mb-4 fw-bold" style={{ fontFamily: 'Playfair Display', color: '#333' }}>Sales Analytics (Yearly)</h5>
            <div style={{ width: '100%', height: 350, minWidth: 0, position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%" minHeight={350}>
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Area type="monotone" dataKey="uv" stackId="1" stroke="#F8B864" fill="#F8B864" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="pv" stackId="1" stroke="#4A6754" fill="#4A6754" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="amt" stackId="1" stroke="#0c5b47" fill="#0c5b47" fillOpacity={0.6} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DashboardChart;
