// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { getDataFromFirestore } from "../Firebase";

const Dashboard = () => {
    const [receivedTotal, setReceivedTotal] = useState(0);
    const [spentTotal, setSpentTotal] = useState(0);
    const [investors, setInvestors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const docs = await getDataFromFirestore();

            let totalReceived = 0;
            let totalSpent = 0;
            const allInvestments = [];

            docs.forEach((doc) => {
                totalReceived += doc.received || 0;
                totalSpent += doc.spent || 0;
                if (Array.isArray(doc.investors_spent)) {
                    doc.investors_spent.forEach((amount, index) => {
                        allInvestments[index] = (allInvestments[index] || 0) + amount;
                    });
                }
            });

            const investorList = allInvestments.map((sum, i) => ({
                id: i + 1,
                name: `И${i + 1}`,
                sum,
            }));

            setReceivedTotal(totalReceived);
            setSpentTotal(totalSpent);
            setInvestors(investorList);
        };

        fetchData();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            {/* Получено */}
            <section className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-2">Получено</h2>
                <p className="text-3xl text-green-600">{receivedTotal} ₽</p>
            </section>

            {/* Потрачено */}
            <section className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-2">Потрачено</h2>
                <p className="text-3xl text-red-600">{spentTotal} ₽</p>
            </section>

            {/* Инвесторы */}
            <section className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Инвесторы</h2>
                <ul className="space-y-2">
                    {investors.length === 0 && <li>Нет данных об инвесторах.</li>}
                    {investors.map((investor) => (
                        <li key={investor.id} className="flex justify-between">
                            <span>{investor.name}</span>
                            <span className="font-medium">{investor.sum} ₽</span>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Dashboard;