"use client";

import { useState, useEffect } from 'react';
import { db } from '@/app/lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import firebase from 'firebase/compat/app';

interface MenuItem {
    id: string;
    name: string;
    price: number;
    description: string;
}

export default function Home() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        const fetchMenuItems = async () => {
            const querySnapshot = await getDocs(collection(db, 'menu'));
            const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as MenuItem[];
            setMenuItems(items);
        };
    
        fetchMenuItems();
    }, []);
    
    const addMenuItem = async () => {
        try {
            const docRef = await addDoc(collection(db, 'menu'), {
                name: 'Banh Mi',
                price: 9.95,
                description: 'Delicious Vietnamese Sandwhich',
            });
            console.log('Document written with ID:', docRef.id);
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold">Menu</h1>
            <button 
                onClick={addMenuItem} 
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
                Add Menu Item
            </button>

            <ul className="mt-6">
                {menuItems.map(item => (
                <li key={item.id} className="mb-4">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-700">${item.price}</p>
                    <p className="text-gray-500">{item.description}</p>
                </li>
                ))}
            </ul>
        </div>
    )
};