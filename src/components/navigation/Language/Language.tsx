import "./Language.css";

import { Globe, ChevronDown } from "lucide-react";

function Language() {
    return (
        <div
            className="language"
            role="button"
            tabIndex={0}
            aria-label="Language Selector"
        >
            <div className="language__icon">
                <Globe size={18} />
            </div>

            <span className="language__text">
                EN
            </span>

            <ChevronDown
                size={16}
                strokeWidth={2.4}
            />
        </div>
    );
}

export default Language;