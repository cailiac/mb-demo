"use client";
import { useState, useMemo } from "react";

interface Country { code: string; name: string; dial: string; digits: number[]; flag: string; }

const COUNTRIES: Country[] = [
  { code:"AE", name:"UAE",           dial:"+971", digits:[9],      flag:"🇦🇪" },
  { code:"AR", name:"Argentina",     dial:"+54",  digits:[10,11],  flag:"🇦🇷" },
  { code:"AU", name:"Australia",     dial:"+61",  digits:[9],      flag:"🇦🇺" },
  { code:"BR", name:"Brazil",        dial:"+55",  digits:[10,11],  flag:"🇧🇷" },
  { code:"CA", name:"Canada",        dial:"+1",   digits:[10],     flag:"🇨🇦" },
  { code:"DE", name:"Germany",       dial:"+49",  digits:[10,11],  flag:"🇩🇪" },
  { code:"ES", name:"Spain",         dial:"+34",  digits:[9],      flag:"🇪🇸" },
  { code:"FR", name:"France",        dial:"+33",  digits:[9],      flag:"🇫🇷" },
  { code:"GB", name:"UK",            dial:"+44",  digits:[10],     flag:"🇬🇧" },
  { code:"IN", name:"India",         dial:"+91",  digits:[10],     flag:"🇮🇳" },
  { code:"IT", name:"Italy",         dial:"+39",  digits:[10],     flag:"🇮🇹" },
  { code:"MX", name:"Mexico",        dial:"+52",  digits:[10],     flag:"🇲🇽" },
  { code:"NL", name:"Netherlands",   dial:"+31",  digits:[9],      flag:"🇳🇱" },
  { code:"PH", name:"Philippines",   dial:"+63",  digits:[10],     flag:"🇵🇭" },
  { code:"PK", name:"Pakistan",      dial:"+92",  digits:[10],     flag:"🇵🇰" },
  { code:"SA", name:"Saudi Arabia",  dial:"+966", digits:[9],      flag:"🇸🇦" },
  { code:"US", name:"USA",           dial:"+1",   digits:[10],     flag:"🇺🇸" },
  { code:"ZA", name:"South Africa",  dial:"+27",  digits:[9],      flag:"🇿🇦" },
];

interface Props {
  value: string;
  onChange: (full: string) => void;
  error?: string;
}

export default function PhoneInput({ value, onChange, error }: Props) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]); // UAE default
  const [localNumber, setLocalNumber] = useState("");

  const expectedDigits = selectedCountry.digits;
  const minDigits = Math.min(...expectedDigits);
  const maxDigits = Math.max(...expectedDigits);

  const placeholder = useMemo(() => {
    return "X".repeat(maxDigits).replace(/(.{4})(?=.)/g,"$1 ");
  }, [maxDigits]);

  const validation = useMemo(() => {
    const digits = localNumber.replace(/\D/g,"");
    if (!digits) return { ok: false, msg: "" };
    if (digits.length < minDigits) return { ok: false, msg: `${minDigits - digits.length} more digit${minDigits-digits.length>1?"s":""} needed` };
    if (digits.length > maxDigits) return { ok: false, msg: `Too many digits (max ${maxDigits})` };
    return { ok: true, msg: `✓ Looks good` };
  }, [localNumber, minDigits, maxDigits]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const c = COUNTRIES.find(c => c.code === e.target.value) || COUNTRIES[0];
    setSelectedCountry(c);
    setLocalNumber("");
    onChange("");
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d\s\-]/g,"");
    setLocalNumber(raw);
    const digits = raw.replace(/\D/g,"");
    const full = digits ? `${selectedCountry.dial}${digits}` : "";
    onChange(full);
  };

  const fi: React.CSSProperties = {
    background:"#F8F2E8",border:"1px solid #D4BFA3",borderRadius:8,
    padding:"11px 14px",fontFamily:"Inter,sans-serif",fontSize:14,
    color:"#1a0a0f",outline:"none",
    transition:"border-color .25s",
  };

  return (
    <div>
      <div style={{display:"flex",gap:8,alignItems:"stretch"}}>
        {/* Country selector */}
        <div style={{position:"relative",flexShrink:0}}>
          <select
            value={selectedCountry.code}
            onChange={handleCountryChange}
            style={{
              ...fi,
              paddingRight:28,paddingLeft:10,
              appearance:"none",cursor:"pointer",
              backgroundImage:`url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236B1532' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
              backgroundRepeat:"no-repeat",backgroundPosition:"right 8px center",
              fontSize:13,minWidth:110,
            }}>
            {COUNTRIES.map(c => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.dial}
              </option>
            ))}
          </select>
        </div>

        {/* Number input */}
        <input
          type="tel"
          value={localNumber}
          onChange={handleNumberChange}
          placeholder={placeholder}
          style={{
            ...fi,
            flex:1,
            borderColor: !localNumber ? "#D4BFA3" : validation.ok ? "#4a7c59" : "#c0392b",
          }}
        />
      </div>

      {/* Helper text */}
      <div style={{
        marginTop:5,fontSize:11,
        color: !localNumber ? "#B8A0A8" : validation.ok ? "#4a7c59" : "#c0392b",
        minHeight:16,
      }}>
        {localNumber ? validation.msg : `${selectedCountry.name}: ${maxDigits} digit${maxDigits>1?"s":""} after ${selectedCountry.dial}`}
      </div>
    </div>
  );
}
