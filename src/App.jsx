import React, { useState } from 'react';
import { Factory, Cpu, Tablet as TabletIcon, TrendingUp, Wallet, Warehouse, CheckCircle2, AlertCircle, Settings2 } from 'lucide-react';

import KpiCard from './components/KpiCard';
import StatusBadge from './components/StatusBadge';
import LinearProgrammingChart from './components/LinearProgrammingChart';

const App = () => {
  const [laptops, setLaptops] = useState(40);
  const [tablets, setTablets] = useState(20);

  const COST_LAPTOP = 800;
  const COST_TABLET = 300;
  const PROFIT_LAPTOP = 200;
  const PROFIT_TABLET = 100;
  const VOL_LAPTOP = 2;
  const VOL_TABLET = 1;
  const BUDGET_LIMIT = 50000;
  const STORAGE_LIMIT = 100;
  const AI_DEMAND_LAPTOP = 50;
  const AI_DEMAND_TABLET = 80;

  const currentCost = (laptops * COST_LAPTOP) + (tablets * COST_TABLET);
  const currentStorage = (laptops * VOL_LAPTOP) + (tablets * VOL_TABLET);
  const currentProfit = (laptops * PROFIT_LAPTOP) + (tablets * PROFIT_TABLET);

  const budgetOk = currentCost <= BUDGET_LIMIT;
  const storageOk = currentStorage <= STORAGE_LIMIT;
  const demandLaptopOk = laptops <= AI_DEMAND_LAPTOP;
  const demandTabletOk = tablets <= AI_DEMAND_TABLET;
  const isFeasible = budgetOk && storageOk && demandLaptopOk && demandTabletOk;

  const solveOptimal = () => {
    setLaptops(10);
    setTablets(80);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Factory className="text-blue-600" />
              Sinfonía Industrial: IA + Programación Lineal
            </h1>
            <p className="text-slate-500">Optimizando la producción de Laptops y Tablets</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={solveOptimal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Cpu size={18} />
              Ejecutar Optimizador
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Settings2 size={20} className="text-slate-400" />
              Decisión de Compra
            </h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">Laptops (x)</label>
                  <span className="text-sm font-bold text-blue-600">{laptops} u.</span>
                </div>
                <input 
                  type="range" min="0" max="60" value={laptops} 
                  onChange={(e) => setLaptops(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">Tablets (y)</label>
                  <span className="text-sm font-bold text-indigo-600">{tablets} u.</span>
                </div>
                <input 
                  type="range" min="0" max="100" value={tablets} 
                  onChange={(e) => setTablets(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase">Estado de Restricciones</h3>
              <StatusBadge label="Presupuesto ($50k)" ok={budgetOk} />
              <StatusBadge label="Almacén (100m³)" ok={storageOk} />
              <StatusBadge label="Demanda Laptop (50)" ok={demandLaptopOk} />
              <StatusBadge label="Demanda Tablet (80)" ok={demandTabletOk} />
            </div>

            <div className={`p-4 rounded-xl border ${isFeasible ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center gap-2 mb-1">
                {isFeasible ? <CheckCircle2 className="text-green-600" size={18} /> : <AlertCircle className="text-red-600" size={18} />}
                <span className={`font-bold ${isFeasible ? 'text-green-700' : 'text-red-700'}`}>
                  {isFeasible ? 'Plan Factible' : 'Plan No Válido'}
                </span>
              </div>
              <p className="text-xs text-slate-600">
                {isFeasible 
                  ? 'La combinación cumple con todos los límites físicos y financieros.' 
                  : 'Has excedido uno o más límites. Ajusta los valores.'}
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <KpiCard title="Ganancia Estimada" value={`$${currentProfit.toLocaleString()}`} icon={<TrendingUp className="text-green-600" />} color="text-green-600" />
              <KpiCard title="Inversión" value={`$${currentCost.toLocaleString()}`} icon={<Wallet className="text-blue-600" />} subtext={`Máx: $${BUDGET_LIMIT.toLocaleString()}`} />
              <KpiCard title="Espacio Usado" value={`${currentStorage} m³`} icon={<Warehouse className="text-indigo-600" />} subtext={`Máx: ${STORAGE_LIMIT} m³`} />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col" style={{ minHeight: '450px' }}>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <h3 className="text-sm font-bold text-slate-400 uppercase">Gráfico de Optimización (Método Gráfico)</h3>
                <div className="flex flex-wrap gap-3 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Almacén</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Demanda</span>
                  <span className="flex items-center gap-1"><div className="w-3 h-0.5 bg-pink-500 border border-pink-500 border-dashed"></div> Ganancia (Z)</span>
                </div>
              </div>
              <div className="flex-1 w-full min-h-[350px]">
                <LinearProgrammingChart laptops={laptops} tablets={tablets} isFeasible={isFeasible} currentProfit={currentProfit} />
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 overflow-hidden relative border border-slate-800 shadow-xl">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Factory size={120} color="white" />
               </div>
               
               <h3 className="text-blue-400 font-mono text-xs uppercase tracking-widest mb-6">Live Production Simulation</h3>
               
               <div className="flex items-center justify-around gap-4 relative z-10">
                 <div className="text-center">
                    <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center border-4 border-blue-500/30 mb-2 relative overflow-hidden group">
                      <Cpu className="text-blue-400 group-hover:scale-110 transition-transform" size={32} />
                      {isFeasible && <div className="absolute bottom-0 w-full bg-blue-500/20 h-1/2 animate-pulse" />}
                    </div>
                    <div className="text-white font-bold">{laptops}</div>
                    <div className="text-slate-500 text-[10px] uppercase">Laptops/mes</div>
                 </div>

                 <div className="flex-1 h-1 bg-slate-800 relative">
                    <div className="absolute inset-0 flex justify-around items-center">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className={`w-2 h-2 rounded-full ${isFeasible ? 'bg-blue-500 animate-ping' : 'bg-slate-700'}`} style={{ animationDelay: `${i * 0.2}s` }} />
                      ))}
                    </div>
                 </div>

                 <div className="text-center">
                    <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center border-4 border-indigo-500/30 mb-2 relative overflow-hidden group">
                      <TabletIcon className="text-indigo-400 group-hover:scale-110 transition-transform" size={32} />
                      {isFeasible && <div className="absolute bottom-0 w-full bg-indigo-500/20 h-1/2 animate-pulse" />}
                    </div>
                    <div className="text-white font-bold">{tablets}</div>
                    <div className="text-slate-500 text-[10px] uppercase">Tablets/mes</div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
