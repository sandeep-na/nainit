"use client";
import { useId } from "react";
import { cn } from "@/lib/utils";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string; error?: string; textarea?: false; ref?: React.Ref<HTMLInputElement>;
}
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string; error?: string; textarea: true; ref?: React.Ref<HTMLTextAreaElement>;
}
export function Input(props: InputProps | TextareaProps) {
 const generatedId=useId();
 const {label,error,className,id=generatedId}=props;
 const fieldClass=cn("w-full rounded-xl border bg-white/70 px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500",error?"border-rose-400":"border-slate-200 dark:border-white/10",className);
 let field;
 if(props.textarea){
   const {label: _label,error: _error,className: _className,textarea: _textarea,...rest}=props;
   void _label;void _error;void _className;void _textarea;
   field=<textarea {...rest} id={id} rows={5} aria-invalid={!!error} aria-describedby={error?`${id}-error`:undefined} className={fieldClass}/>;
 }else{
   const {label: _label,error: _error,className: _className,textarea: _textarea,...rest}=props;
   void _label;void _error;void _className;void _textarea;
   field=<input {...rest} id={id} aria-invalid={!!error} aria-describedby={error?`${id}-error`:undefined} className={fieldClass}/>;
 }
 return <div className="w-full space-y-2"><label htmlFor={id} className="text-sm font-medium">{label}</label>{field}{error&&<p id={`${id}-error`} role="alert" className="text-xs font-medium text-rose-600 dark:text-rose-300">{error}</p>}</div>;
}
