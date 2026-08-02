import "./Language.css";
import { Globe, ChevronDown } from "lucide-react";

function Language() {
    return (
        <button
            type="button"
            className="language"
            aria-label="Language Selector, currently English"
        >
            <div className="language__icon">
                <Globe size={18} />
            </div>

            <span className="language__text">
                EN
            </span>

            <ChevronDown size={14} strokeWidth={2.4} className="language__arrow" />
        </button>
    );
}

export default Language;