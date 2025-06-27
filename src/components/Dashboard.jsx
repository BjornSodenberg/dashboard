// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { getDataFromFirestore } from "../Firebase";

const Dashboard = () => {
    const [receivedTotal, setReceivedTotal] = useState(0);
    const [spentTotal, setSpentTotal] = useState(0);
    const [investors, setInvestors] = useState([]);
    const [dateString, setDateString] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const docs = await getDataFromFirestore();

            let totalReceived = 0;
            let totalSpent = 0;
            const allInvestments = [];
            let dateString = "";

            docs.forEach((doc) => {
                totalReceived += doc.received || 0;
                totalSpent += doc.spent || 0;
                if (Array.isArray(doc.investors_spent)) {
                    doc.investors_spent.forEach((amount, index) => {
                        allInvestments[index] = (allInvestments[index] || 0) + amount;
                    });
                }
                dateString = doc.dateTime;
            });

            const investorList = allInvestments.map((sum, i) => ({
                id: i + 1,
                name: `И${i + 1}`,
                sum,
            }));

            setReceivedTotal(totalReceived);
            setSpentTotal(totalSpent);
            setInvestors(investorList);
            setDateString(dateString);
        };

        const getBilling = async () => {
            const response = await fetch('/v1/cloud_billing/statistic/projects')
            ixO5JMyMoGFcShrSZlGcS2I60_306509
        }

        fetchData();
    }, []);

    return (
        <div className="flex flex-row">
            <div className="flex flex-col flex-1 h-screen justify-center">
                <section className="flex-1 flex border-b-1 border-gray-300 px-10 flex-col justify-center gap-5">
                    <p className="text-9xl text-red-600">{spentTotal} ₽</p>
                    <p className="text-neutral-500">На {dateString}</p>
                </section>

                <section className="flex-1 flex mx-10 flex-col justify-center gap-5">
                    <p className="text-9xl text-green-600">{receivedTotal} ₽</p>
                    <p className="text-neutral-500">На {dateString}</p>
                </section>
            </div>
            <section className="flex w-sm   border-l-1 border-gray-300">
                <ul className="space-y-2 p-10">
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