"use client";
import { useState, useMemo } from "react";
import { AsYouType, CountryCode } from "libphonenumber-js";

interface Country { 
  code: string; 
  name: string; 
  dial: string; 
  digits: number[]; 
  flag: string; 
}

const COUNTRIES: Country[] = [
  // Middle East
  { code:"AE", name:"UAE",           dial:"+971", digits:[9],      flag:"🇦🇪" },
  { code:"SA", name:"Saudi Arabia",  dial:"+966", digits:[9],      flag:"🇸🇦" },
  { code:"QA", name:"Qatar",         dial:"+974", digits:[8],      flag:"🇶🇦" },
  { code:"KW", name:"Kuwait",        dial:"+965", digits:[8],      flag:"🇰🇼" },
  { code:"OM", name:"Oman",          dial:"+968", digits:[8],      flag:"🇴🇲" },
  { code:"BH", name:"Bahrain",       dial:"+973", digits:[8],      flag:"🇧🇭" },
  { code:"JO", name:"Jordan",        dial:"+962", digits:[9],      flag:"🇯🇴" },
  { code:"LB", name:"Lebanon",       dial:"+961", digits:[7,8],    flag:"🇱🇧" },
  { code:"EG", name:"Egypt",         dial:"+20",  digits:[10],     flag:"🇪🇬" },
  // Europe
  { code:"GB", name:"UK",            dial:"+44",  digits:[10],     flag:"🇬🇧" },
  { code:"ES", name:"Spain",         dial:"+34",  digits:[9],      flag:"🇪🇸" },
  { code:"FR", name:"France",        dial:"+33",  digits:[9],      flag:"🇫🇷" },
  { code:"IT", name:"Italy",         dial:"+39",  digits:[9,10],   flag:"🇮🇹" },
  { code:"DE", name:"Germany",       dial:"+49",  digits:[10,11],  flag:"🇩🇪" },
  { code:"PT", name:"Portugal",      dial:"+351", digits:[9],      flag:"🇵🇹" },
  { code:"NL", name:"Netherlands",   dial:"+31",  digits:[9],      flag:"🇳🇱" },
  { code:"CH", name:"Switzerland",   dial:"+41",  digits:[9],      flag:"🇨🇭" },
  { code:"GR", name:"Greece",        dial:"+30",  digits:[10],     flag:"🇬🇷" },
  { code:"IE", name:"Ireland",       dial:"+353", digits:[9],      flag:"🇮🇪" },
  { code:"SE", name:"Sweden",        dial:"+46",  digits:[7,8,9],  flag:"🇸🇪" },
  // Americas
  { code:"US", name:"USA",           dial:"+1",   digits:[10],     flag:"🇺🇸" },
  { code:"CA", name:"Canada",        dial:"+1",   digits:[10],     flag:"🇨🇦" },
  { code:"MX", name:"Mexico",        dial:"+52",  digits:[10],     flag:"🇲🇽" },
  { code:"AR", name:"Argentina",     dial:"+54",  digits:[10,11],  flag:"🇦🇷" },
  { code:"BR", name:"Brazil",        dial:"+55",  digits:[10,11],  flag:"🇧🇷" },
  { code:"CL", name:"Chile",         dial:"+56",  digits:[9],      flag:"🇨🇱" },
  { code:"CO", name:"Colombia",      dial:"+57",  digits:[10],     flag:"🇨🇴" },
  { code:"PE", name:"Peru",          dial:"+51",  digits:[9],      flag:"🇵🇪" },
  { code:"UY", name:"Uruguay",       dial:"+598", digits:[8,9],    flag:"🇺🇾" },
  // Asia / Pacific
  { code:"AU", name:"Australia",     dial:"+61",  digits:[9],      flag:"🇦🇺" },
  { code:"NZ", name:"New Zealand",   dial:"+64",  digits:[8,9,10], flag:"🇳🇿" },
  { code:"JP", name:"Japan",         dial:"+81",  digits:[10],     flag:"🇯🇵" },
  { code:"CN", name:"China",         dial:"+86",  digits:[11],     flag:"🇨🇳" },
  { code:"SG", name:"Singapore",     dial:"+65",  digits:[8],      flag:"🇸🇬" },
  { code:"TH", name:"Thailand",      dial:"+66",  digits:[9],      flag:"🇹🇭" },
  { code:"ID", name:"Indonesia",     dial:"+62",  digits:[9,10,11],flag:"🇮🇩" },
  { code:"PH", name:"Philippines",   dial:"+63",  digits:[10],     flag:"🇵🇭" },
  { code:"IN", name:"India",         dial:"+91",  digits:[10],     flag:"🇮🇳" },
  { code:"PK", name:"Pakistan",      dial:"+92",  digits:[10],     flag:"🇵🇰" },
  { code:"KR", name:"South Korea",   dial:"+82",  digits:[9,10],   flag:"🇰🇷" },
  { code:"VN", name:"Vietnam",       dial:"+84",  digits:[9],      flag:"🇻🇳" },
  // Africa
  { code:"ZA", name:"South Africa",  dial:"+27",  digits:[9],      flag:"🇿🇦" },
  { code:"MA", name:"Morocco",       dial:"+212", digits:[9],      flag:"🇲🇦" },
  { code:"KE", name:"Kenya",         dial:"+254", digits:[9],      flag:"🇰🇪" },
];

interface Props {
  value: string;
  onChange: (full: string) => void;
}

export default function PhoneInput({ value, onChange }: Props) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [localNumber, setLocalNumber] = useState("");

  const maxDigits = Math.max(...selectedCountry.digits);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const c = COUNTRIES.find(c => c.code === e.target.value) || COUNTRIES[0];
    setSelectedCountry(c);
    setLocalNumber("");
    onChange("");
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const digitsOnly = input.replace(/\D/g, "");

    // BLOQUEO ESTRICTO: No permite escribir más del máximo definido para el país
    if (digitsOnly.length > maxDigits) return;

    // FORMATEO AUTOMÁTICO (Masking)
    const formatter = new AsYouType(selectedCountry.code as CountryCode);
    const formatted = formatter.input(digitsOnly);

    setLocalNumber(formatted);
    
    // Enviamos el número completo (prefijo + dígitos) al estado global del formulario
    const full = digitsOnly ? `${selectedCountry.dial}${digitsOnly}` : "";
    onChange(full);
  };

  const isComplete = useMemo(() => {
    const digits = localNumber.replace(/\D/g, "");
    return selectedCountry.digits.includes(digits.length);
  }, [localNumber, selectedCountry]);

  // Estilos base
  const fi: React.CSSProperties = {
    background: "#F8F2E8",
    border: "1px solid #D4BFA3",
    borderRadius: 8,
    padding: "11px 14px",
    fontFamily: "Inter, sans-serif",
    fontSize: 14,
    color: "#1a0a0f",
    outline: "none",
    transition: "all .2s ease",
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "stretch" }}>
        {/* Selector de País */}
        <select
          value={selectedCountry.code}
          onChange={handleCountryChange}
          style={{
            ...fi,
            paddingRight: 28,
            minWidth: 105,
            appearance: "none",
            cursor: "pointer",
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236B1532' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 10px center",
          }}
        >
          {COUNTRIES.map(c => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.dial}
            </option>
          ))}
        </select>

        {/* Input de Teléfono */}
        <input
          type="tel"
          value={localNumber}
          onChange={handleNumberChange}
          placeholder="Phone number"
          style={{
            ...fi,
            flex: 1,
            borderColor: isComplete ? "#4a7c59" : "#D4BFA3",
            boxShadow: isComplete ? "0 0 0 1px #4a7c59" : "none",
          }}
        />
      </div>

      {/* Etiqueta de estado minimalista */}
      <div style={{
        marginTop: 6,
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: "0.8px",
        textTransform: "uppercase",
        color: isComplete ? "#4a7c59" : "#7a5560",
        minHeight: "12px",
        display: "flex",
        alignItems: "center",
        gap: 4
      }}>
        {isComplete ? "✓ Valid format" : selectedCountry.name}
      </div>
    </div>
  );
}