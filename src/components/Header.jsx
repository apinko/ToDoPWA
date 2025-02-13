import { Link } from 'react-router-dom';
import ConnectionStatus from './ConnectionStatus';

export default function Header() {
  return (
    <div className="flex flex-col w-full p-4 bg-yellow-700 text-white rounded-lg shadow-md mb-6"> {/* Zwiększony odstęp poniżej */}
      {/* Górny wiersz: Nazwa aplikacji + Status online */}
      <div className="flex justify-between items-center w-full pb-2 border-b border-white">
        <h1 className='text-xl font-bold text-yellow-300'>My ToDo List</h1>
        <ConnectionStatus /> {/* Status online/offline */}
      </div>

      {/* Dolny wiersz: Nawigacja */}
      <div className="flex justify-around items-center w-full pt-3 text-lg font-semibold">
        <Link to="/" className="hover:text-gray-300">📋 Lista</Link>
        <Link to="/add" className="hover:text-gray-300">➕ Dodaj</Link>
        <Link to="/stats" className="hover:text-gray-300">📊 Statystyki</Link>
      </div>
    </div>
  );
}
