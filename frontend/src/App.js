import React, { useState, useEffect } from 'react';
import { Search, MapPin, Building, Landmark, Calendar, RefreshCw, AlertCircle, CheckCircle, Globe2, Phone, Mail, Clock } from 'lucide-react';

const BrasilAPIPortfolio = () => {
  const [cepData, setCepData] = useState(null);
  const [cnpjData, setCnpjData] = useState(null);
  const [banksData, setBanksData] = useState([]);
  const [holidaysData, setHolidaysData] = useState([]);
  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});
  const [searchValues, setSearchValues] = useState({
    cep: '',
    cnpj: ''
  });

  // URL da sua API PHP - ajuste conforme necessário
  const API_BASE_URL = 'http://localhost/brasil-api-client-react/backend';

  // Função para buscar CEP
  const fetchCEP = async (cep) => {
    setLoading(prev => ({ ...prev, cep: true }));
    setError(prev => ({ ...prev, cep: null }));
    
    try {
      const response = await fetch(`${API_BASE_URL}/cep/v1/${cep}`);
      const result = await response.json();
      
      if (result.success) {
        setCepData(result.data);
      } else {
        setError(prev => ({ ...prev, cep: result.error }));
      }
    } catch (err) {
      setError(prev => ({ ...prev, cep: 'Erro na conexão' }));
    } finally {
      setLoading(prev => ({ ...prev, cep: false }));
    }
  };

  // Função para buscar CNPJ
  const fetchCNPJ = async (cnpj) => {
    const cleanCnpj = cnpj.replace(/\D/g, ''); // Remove tudo que não é número
    setLoading(prev => ({ ...prev, cnpj: true }));
    setError(prev => ({ ...prev, cnpj: null }));
    
    try {
      const response = await fetch(`${API_BASE_URL}/cnpj/v1/${cleanCnpj}`);
      const result = await response.json();
      
      if (result.success) {
        setCnpjData(result.data);
      } else {
        setError(prev => ({ ...prev, cnpj: result.error }));
      }
    } catch (err) {
      setError(prev => ({ ...prev, cnpj: 'Erro na conexão' }));
    } finally {
      setLoading(prev => ({ ...prev, cnpj: false }));
    }
  };

  // Função para buscar bancos
  const fetchBanks = async () => {
    setLoading(prev => ({ ...prev, banks: true }));
    
    try {
      const response = await fetch(`${API_BASE_URL}/banks/v1`);
      const result = await response.json();
      
      if (result.success) {
        setBanksData(result.data.slice(0, 8));
      }
    } catch (err) {
      setError(prev => ({ ...prev, banks: 'Erro ao carregar bancos' }));
    } finally {
      setLoading(prev => ({ ...prev, banks: false }));
    }
  };

  // Função para buscar feriados

const [holidayYear, setHolidayYear] = useState(new Date().getFullYear());

// Ajuste a função fetchHolidays para não usar holidayMonth:
const fetchHolidays = async () => {
  setLoading(prev => ({ ...prev, holidays: true }));
  try {
    let url = `${API_BASE_URL}/feriados/v1/${holidayYear}`;
    const response = await fetch(url);
    const result = await response.json();
    if (result.success) {
      setHolidaysData(result.data);
    }
  } catch (err) {
    setError(prev => ({ ...prev, holidays: 'Erro ao carregar feriados' }));
  } finally {
    setLoading(prev => ({ ...prev, holidays: false }));
  }
};

  // Carregar dados iniciais
  useEffect(() => {
    fetchBanks();
    fetchHolidays();
  }, []);

  const handleSearch = (type) => {
    if (type === 'cep' && searchValues.cep.length >= 8) {
      fetchCEP(searchValues.cep);
    } else if (type === 'cnpj' && searchValues.cnpj.length >= 14) {
      fetchCNPJ(searchValues.cnpj);
    }
  };

  const formatCEP = (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const formatCNPJ = (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

const [bankCode, setBankCode] = useState('');
const [bankResult, setBankResult] = useState(null);

// Filtro de bancos
const fetchBankByCode = async () => {
  if (!bankCode) return;
  setLoading(prev => ({ ...prev, bankByCode: true }));
  setError(prev => ({ ...prev, bankByCode: null }));
  setBankResult(null);
  try {
    const response = await fetch(`${API_BASE_URL}/banks/v1/${bankCode}`);
    const result = await response.json();
    if (result.success) {
      setBankResult(result.data);
    } else {
      setError(prev => ({ ...prev, bankByCode: result.error || 'Banco não encontrado' }));
    }
  } catch (err) {
    setError(prev => ({ ...prev, bankByCode: 'Erro ao buscar banco' }));
  } finally {
    setLoading(prev => ({ ...prev, bankByCode: false }));
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg">
                <Globe2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Portfolio BrasilAPI</h1>
                <p className="text-gray-600">PHP + React + BrasilAPI</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-green-700 font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Consulte Dados do Brasil
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Interface moderna para explorar informações de CEPs, CNPJs, bancos e feriados através da BrasilAPI
          </p>
        </div>

        {/* Search Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* CEP Search */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-100 p-3 rounded-xl">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Consultar CEP</h3>
                <p className="text-gray-600">Encontre endereços completos</p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="Digite o CEP (ex: 01310-100)"
                value={searchValues.cep}
                onChange={(e) => setSearchValues(prev => ({ ...prev, cep: formatCEP(e.target.value) }))}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                maxLength="9"
              />
              <button
                onClick={() => handleSearch('cep')}
                disabled={loading.cep}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center space-x-2"
              >
                {loading.cep ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                <span>Buscar</span>
              </button>
            </div>

            {error.cep && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span className="text-red-700">{error.cep}</span>
              </div>
            )}

            {cepData && (
              <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Logradouro</p>
                    <p className="font-semibold text-gray-900">{cepData.street}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Bairro</p>
                    <p className="font-semibold text-gray-900">{cepData.neighborhood}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Cidade</p>
                    <p className="font-semibold text-gray-900">{cepData.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Estado</p>
                    <p className="font-semibold text-gray-900">{cepData.state}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CNPJ Search */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-purple-100 p-3 rounded-xl">
                <Building className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Consultar CNPJ</h3>
                <p className="text-gray-600">Dados completos da empresa</p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="Digite o CNPJ (ex: 11.222.333/0001-81)"
                value={searchValues.cnpj}
                onChange={(e) => setSearchValues(prev => ({ ...prev, cnpj: formatCNPJ(e.target.value) }))}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                maxLength="18"
              />
              <button
                onClick={() => handleSearch('cnpj')}
                disabled={loading.cnpj}
                className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 transition-colors flex items-center space-x-2"
              >
                {loading.cnpj ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                <span>Buscar</span>
              </button>
            </div>

            {error.cnpj && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span className="text-red-700">{error.cnpj}</span>
              </div>
            )}

            {cnpjData && (
              <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Razão Social</p>
                    <p className="font-semibold text-gray-900">{cnpjData.razao_social}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Nome Fantasia</p>
                    <p className="font-semibold text-gray-900">{cnpjData.nome_fantasia || 'Não informado'}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Situação</p>
                      <p className="font-semibold text-gray-900">{cnpjData.descricao_situacao_cadastral}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Porte</p>
                      <p className="font-semibold text-gray-900">{cnpjData.porte}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Banks Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-xl">
                <Landmark className="h-6 w-6 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Bancos Brasileiros</h3>
                <p className="text-gray-600">Principais instituições financeiras</p>
              </div>
            </div>
              <div className="flex items-center space-x-2 mt-4">
  <input
    type="text"
    placeholder="Buscar banco por código"
    value={bankCode}
    onChange={e => setBankCode(e.target.value)}
    className="px-3 py-2 border border-gray-300 rounded-lg"
    style={{ minWidth: 120 }}
  />
  <button
    onClick={fetchBankByCode}
    disabled={loading.bankByCode}
    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center space-x-2"
  >
    {loading.bankByCode ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
    <span>Buscar</span>
  </button>
</div>
{error.bankByCode && (
  <div className="mt-2 text-red-600">{error.bankByCode}</div>
)}
{bankResult && (
  <div className="mt-4 bg-white rounded-xl shadow-md p-6 border border-gray-100">
    <div className="flex items-center space-x-3">
      <div className="bg-green-100 p-2 rounded-lg">
        <Landmark className="h-5 w-5 text-green-600" />
      </div>
      <div>
        <p className="font-semibold text-gray-900">{bankResult.name}</p>
        <p className="text-sm text-gray-600">Código: {bankResult.code}</p>
        <p className="text-sm text-gray-600">ISPB: {bankResult.ispb}</p>
      </div>
    </div>
  </div>
            )}
          </div>
        </div>



{/* Holidays Section */}
<div>
  <div className="flex items-center justify-between mb-6">
    {error.holidays && (
  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
    <AlertCircle className="h-5 w-5 text-red-500" />
    <span className="text-red-700">{error.holidays}</span>
  </div>
)}

{holidaysData && holidaysData.length > 0 && (
  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {holidaysData.map((holiday, idx) => (
      <div key={idx} className="bg-white rounded-xl shadow p-4 flex items-center space-x-3 border border-gray-100">
        <Calendar className="h-6 w-6 text-orange-600" />
        <div>
          <p className="font-semibold text-gray-900">{holiday.name}</p>
          <p className="text-sm text-gray-600">{formatDate(holiday.date)}</p>
        </div>
      </div>
    ))}
  </div>
)}
    <div className="flex space-x-2">
      <select
        value={holidayYear}
        onChange={e => setHolidayYear(e.target.value)}
        className="px-2 py-1 border border-gray-300 rounded"
      >
        {[2023, 2024, 2025, 2026].map(y => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
      <button
        onClick={fetchHolidays}
        disabled={loading.holidays}
        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-colors flex items-center space-x-2"
      >
        {loading.holidays ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
        <span>Atualizar</span>
      </button>
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default BrasilAPIPortfolio;