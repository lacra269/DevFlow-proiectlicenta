"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiMail, FiLock, FiBell, FiImage, FiEdit2, FiSave, FiLoader, FiCheckCircle, FiAlertCircle, FiEye, FiEyeOff, FiSettings, FiCode, FiBriefcase, FiShare2, FiTool, FiTerminal } from "react-icons/fi"; // Import icons

// Definim tipurile de tab-uri
type TabName = 'account' | 'profile' | 'developer' | 'notifications' | 'appearance';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // --- Account ---
    username: "lacra269",
    email: "lacramioarabordeanu@student.uaic.ro",
    currentPassword: "", 
    newPassword: "",
    confirmNewPassword: "",
    // --- Profile ---
    avatarUrl: "/image/githubprofil.png", 
    bio: "Dezvoltator pasionat explorând noi tehnologii.", // Tradus
    // --- Developer ---
    experientă: "", // Adăugat pentru a evita eroarea

    skills: "React, Next.js, TypeScript, Node.js", // Păstrat (exemple tehnice)
    currentlyHackingOn: "Construiesc funcționalități DEVFLOW!", // Tradus
    availableFor: "Colaborare, Mentorat", // Tradus
    coding: "Învăț Rust și WebAssembly.", // Tradus
    // --- Notifications ---
    notifications: {
      email: true,
      push: false,
    },
    // --- Appearance ---
    theme: "light",
  });

  const [activeTab, setActiveTab] = useState<TabName>('account');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [saveMessage, setSaveMessage] = useState('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onloadend = () => {
              setSettings(prev => ({ ...prev, avatarUrl: reader.result as string }));
          }
          reader.readAsDataURL(file);
          e.target.value = ""; 
      }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const checked = isCheckbox ? (e.target as HTMLInputElement).checked : undefined;

    if (name === 'emailNotifications' || name === 'pushNotifications') {
      const notificationType = name === 'emailNotifications' ? 'email' : 'push';
      setSettings(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [notificationType]: checked,
        },
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setSaveMessage('');

    if (settings.newPassword && settings.newPassword !== settings.confirmNewPassword) {
      setStatus('error');
      setSaveMessage('Parolele noi nu se potrivesc.'); // Tradus
      return;
    }
    if (settings.newPassword && !settings.currentPassword) {
        setStatus('error');
        setSaveMessage('Te rugăm să introduci parola curentă pentru a seta una nouă.'); // Tradus
        return;
    }

    console.log("Se salvează setările:", settings); // Tradus
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    const isSuccess = Math.random() > 0.1; 

    if (isSuccess) {
      setStatus('success');
      setSaveMessage('Setările au fost salvate cu succes!'); // Tradus
      setSettings(prev => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
      }));
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      setStatus('error');
      setSaveMessage('Salvarea setărilor a eșuat. Te rugăm să încerci din nou.'); // Tradus
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const tabs: { name: TabName; label: string; icon: JSX.Element; content: JSX.Element }[] = [
    { name: 'account', label: 'Cont', icon: <FiUser />, content: ( // Tradus
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Informații Cont</h3> {/* Tradus */}
            <InputField label="Nume utilizator" id="username" name="username" value={settings.username} onChange={handleChange} disabled={status === 'loading'} icon={<FiUser />} /> {/* Tradus */}
            <InputField label="Email" id="email" name="email" type="email" value={settings.email} onChange={handleChange} disabled={status === 'loading'} icon={<FiMail />} /> {/* Tradus */}

            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mt-8">Schimbă Parola</h3> {/* Tradus */}
            <PasswordField
                label="Parola Curentă" id="currentPassword" name="currentPassword" value={settings.currentPassword} onChange={handleChange} disabled={status === 'loading'} // Tradus
                showPassword={showCurrentPassword} setShowPassword={setShowCurrentPassword}
            />
            <PasswordField
                label="Parola Nouă" id="newPassword" name="newPassword" value={settings.newPassword} onChange={handleChange} disabled={status === 'loading'} // Tradus
                showPassword={showNewPassword} setShowPassword={setShowNewPassword}
            />
            <PasswordField
                label="Confirmă Parola Nouă" id="confirmNewPassword" name="confirmNewPassword" value={settings.confirmNewPassword} onChange={handleChange} disabled={status === 'loading'} // Tradus
                showPassword={showConfirmPassword} setShowPassword={setShowConfirmPassword}
            />
        </div>
    )},
    { name: 'profile', label: 'Profil', icon: <FiEdit2 />, content: ( // Tradus
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Personalizare Profil</h3> {/* Tradus */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Poză de Profil</label> {/* Tradus */}
                <div className="flex items-center space-x-4">
                    <img src={settings.avatarUrl || `https://placehold.co/80x80/e5e7eb/4b5563?text=${settings.username.substring(0,2).toUpperCase()}`} alt="Avatar" className="w-20 h-20 rounded-full object-cover bg-gray-200 border" />
                    <label htmlFor="avatar-upload" className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <span>Schimbă</span> {/* Tradus */}
                        <input id="avatar-upload" name="avatar-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                    </label>
                </div>
            </div>
            <TextareaField label="Biografie" id="bio" name="bio" value={settings.bio} onChange={handleChange} rows={4} disabled={status === 'loading'} maxLength={300} showCounter={true} /> {/* Tradus */}
        </div>
    )},
    { name: 'developer', label: 'Dezvoltator', icon: <FiCode />, content: ( // Tradus
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Profil Dezvoltator</h3> 
            <TextareaField label="Nivel de experiență" id="experientă" name="experientă" value={settings.experientă} onChange={handleChange} rows={3} disabled={status === 'loading'} placeholder=" " maxLength={200} showCounter={true} /> 
            <TextareaField label="Abilități/Limbaje" id="skills" name="skills" value={settings.skills} onChange={handleChange} rows={3} disabled={status === 'loading'} placeholder="ex: React, Python, AWS..." maxLength={200} showCounter={true} /> 
            <TextareaField label="Lucrez la" id="currentlyHackingOn" name="currentlyHackingOn" value={settings.currentlyHackingOn} onChange={handleChange} rows={3} disabled={status === 'loading'} placeholder="Ce proiecte îți ocupă timpul?" maxLength={200} showCounter={true} /> {/* Tradus */}
            <TextareaField label="Disponibil pentru" id="availableFor" name="availableFor" value={settings.availableFor} onChange={handleChange} rows={3} disabled={status === 'loading'} placeholder="ex: Colaborare, Oportunități de angajare, Mentorat..." maxLength={200} showCounter={true} /> {/* Tradus */}
            <TextareaField label="Învăț în prezent" id="coding" name="coding" value={settings.coding} onChange={handleChange} rows={3} disabled={status === 'loading'} placeholder="Ce tehnologii noi explorezi?" maxLength={200} showCounter={true} /> {/* Tradus */}
        </div>
    )},
    { name: 'notifications', label: 'Notificări', icon: <FiBell />, content: ( // Tradus
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Preferințe Notificări</h3> {/* Tradus */}
            <CheckboxField label="Notificări Email" id="emailNotifications" name="emailNotifications" checked={settings.notifications.email} onChange={handleChange} disabled={status === 'loading'} description="Primește actualizări importante prin email."/> {/* Tradus */}
            <CheckboxField label="Notificări Push" id="pushNotifications" name="pushNotifications" checked={settings.notifications.push} onChange={handleChange} disabled={status === 'loading'} description="Primește alerte în timp real în browser (dacă este suportat)."/> {/* Tradus */}
        </div>
    )},
      { name: 'appearance', label: 'Aspect', icon: <FiSettings />, content: ( // Tradus
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Setări Temă</h3> {/* Tradus */}
            <SelectField label="Temă" id="theme" name="theme" value={settings.theme} onChange={handleChange} disabled={status === 'loading'} options={[{value: 'light', label: 'Temă Deschisă'}, {value: 'dark', label: 'Temă Întunecată'}]} /> {/* Tradus */}
        </div>
    )},
  ];

  return (
    <main className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">Setări</h1> {/* Tradus */}

      <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg">
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`whitespace-nowrap flex items-center py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.name
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                aria-current={activeTab === tab.name ? 'page' : undefined}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {tabs.map((tab) =>
              activeTab === tab.name ? (
                <motion.div
                  key={tab.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {tab.content}
                </motion.div>
              ) : null
            )}
          </AnimatePresence>

            <div className="mt-8 pt-6 border-t border-gray-200">
            <AnimatePresence>
                {status === 'success' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-4 p-3 bg-green-100 text-green-700 border border-green-200 rounded-lg text-sm flex items-center">
                    <FiCheckCircle className="mr-2"/> {saveMessage}
                </motion.div>
                )}
                {status === 'error' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-4 p-3 bg-red-100 text-red-700 border border-red-200 rounded-lg text-sm flex items-center">
                    <FiAlertCircle className="mr-2"/> {saveMessage}
                </motion.div>
                )}
            </AnimatePresence>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`inline-flex justify-center items-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                      <FiLoader className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                  ) : (
                      <FiSave className="-ml-1 mr-2 h-5 w-5 text-white" />
                  )}
                  {status === 'loading' ? 'Se salvează...' : 'Salvează Modificările'} {/* Tradus */}
                </button>
              </div>
            </div>
        </form>
      </div>
    </main>
  );
}

// --- Componente Helper pentru Form Fields ---
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  icon?: JSX.Element;
}
const InputField = ({ label, id, icon, ...props }: InputFieldProps) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      {icon && <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">{icon}</span>}
      <input
        id={id}
        {...props}
        className={`w-full ${icon ? 'pl-10' : ''} p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 disabled:opacity-50 disabled:bg-gray-100`}
      />
    </div>
  </div>
);

interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    showPassword?: boolean;
    setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
}
const PasswordField = ({ label, id, showPassword, setShowPassword, ...props }: PasswordFieldProps) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiLock /></span>
            <input
                type={showPassword ? "text" : "password"}
                id={id}
                {...props}
                className="w-full pl-10 pr-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 disabled:opacity-50 disabled:bg-gray-100"
            />
            {setShowPassword && (
                <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    aria-label={showPassword ? "Ascunde parola" : "Arată parola"} // Tradus
                >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
            )}
        </div>
    </div>
);


interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  showCounter?: boolean;
}
const TextareaField = ({ label, id, rows = 4, maxLength, showCounter, value, ...props }: TextareaFieldProps) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      id={id}
      rows={rows}
      maxLength={maxLength}
      value={value}
      {...props}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 disabled:opacity-50 disabled:bg-gray-100"
    />
    {showCounter && maxLength && (
      <p className="text-xs text-gray-500 text-right mt-1">
        {String(value)?.length || 0}/{maxLength}
      </p>
    )}
  </div>
);

interface CheckboxFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    description?: string;
}
const CheckboxField = ({ label, id, description, ...props }: CheckboxFieldProps) => (
    <div className="relative flex items-start">
        <div className="flex items-center h-5">
            <input
                id={id}
                type="checkbox"
                {...props}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded disabled:opacity-50"
            />
        </div>
        <div className="ml-3 text-sm">
            <label htmlFor={id} className="font-medium text-gray-700">{label}</label>
            {description && <p className="text-gray-500">{description}</p>}
        </div>
    </div>
);

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    id: string;
    options: { value: string; label: string }[];
}
const SelectField = ({ label, id, options, ...props }: SelectFieldProps) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <select
            id={id}
            {...props}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 disabled:opacity-50 disabled:bg-gray-100"
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
);
