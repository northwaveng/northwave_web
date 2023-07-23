import { db } from '@/firebase/fire_config';
import { collection, getDocs } from 'firebase/firestore';

export default async function exportUsersAsCSV() {
    const usersCollection = collection(db, 'users');
    const snapshot = await getDocs(usersCollection);

    const csv = snapshot.docs.map(doc => Object.values(doc.data()).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'users.csv');
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
