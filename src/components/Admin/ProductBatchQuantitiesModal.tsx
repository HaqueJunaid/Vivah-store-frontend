import React, { useState, useEffect } from "react";
import { X, Plus, Trash2, Boxes, Check, Sparkles, RefreshCw, AlertCircle, ArrowUpDown, Layers } from "lucide-react";
import toast from "react-hot-toast";

export const DEFAULT_BATCH_QUANTITIES = [
  25, 50, 75, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000,
];

export const BATCH_PRESETS = [
  {
    label: "Standard (25 - 1000)",
    description: "25, 50, 75, 100... up to 1000 pcs",
    quantities: DEFAULT_BATCH_QUANTITIES,
  },
  {
    label: "Small Batches (10 - 250)",
    description: "10, 20, 30, 40, 50, 75, 100, 150, 200, 250 pcs",
    quantities: [10, 20, 30, 40, 50, 75, 100, 150, 200, 250],
  },
  {
    label: "Micro Packs (5 - 50)",
    description: "5, 10, 15, 20, 25, 30, 35, 40, 45, 50 pcs",
    quantities: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
  },
  {
    label: "Wholesale Bulk (100 - 10k)",
    description: "100, 250, 500, 1000, 2500, 5000, 10000 pcs",
    quantities: [100, 250, 500, 1000, 2500, 5000, 10000],
  },
  {
    label: "Multiples of 10 (10 - 100)",
    description: "10, 20, 30... 100 pcs",
    quantities: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  },
  {
    label: "Multiples of 50 (50 - 500)",
    description: "50, 100, 150... 500 pcs",
    quantities: [50, 100, 150, 200, 250, 300, 350, 400, 450, 500],
  },
  {
    label: "Multiples of 100 (100 - 1000)",
    description: "100, 200, 300... 1000 pcs",
    quantities: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
  },
];

interface ProductBatchQuantitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuantities?: number[];
  onSave: (quantities: number[]) => void;
}

const ProductBatchQuantitiesModal: React.FC<ProductBatchQuantitiesModalProps> = ({
  isOpen,
  onClose,
  initialQuantities = [],
  onSave,
}) => {
  const [quantities, setQuantities] = useState<number[]>([]);
  const [singleQty, setSingleQty] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  // Range generator state
  const [showGenerator, setShowGenerator] = useState(false);
  const [rangeStart, setRangeStart] = useState("25");
  const [rangeEnd, setRangeEnd] = useState("500");
  const [rangeStep, setRangeStep] = useState("25");

  // Sync initial quantities when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialQuantities && initialQuantities.length > 0) {
        const sorted = [...initialQuantities].filter((n) => typeof n === "number" && n > 0).sort((a, b) => a - b);
        setQuantities(sorted);
      } else {
        setQuantities([...DEFAULT_BATCH_QUANTITIES]);
      }
      setSingleQty("");
      setFormError(null);
      setShowGenerator(false);
    }
  }, [isOpen, initialQuantities]);

  // ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleAddSingleQty = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setFormError(null);

    const val = parseInt(singleQty.trim(), 10);
    if (isNaN(val) || val <= 0) {
      setFormError("Please enter a valid positive quantity number (e.g. 50, 125).");
      return;
    }

    if (quantities.includes(val)) {
      setFormError(`Batch quantity ${val} pcs is already in the list.`);
      return;
    }

    const updated = [...quantities, val].sort((a, b) => a - b);
    setQuantities(updated);
    setSingleQty("");
    toast.success(`Added ${val} pcs to batch list`);
  };

  const handleRemoveQty = (valToRemove: number) => {
    setQuantities((prev) => prev.filter((q) => q !== valToRemove));
  };

  const handleApplyPreset = (preset: (typeof BATCH_PRESETS)[0]) => {
    setQuantities([...preset.quantities]);
    setFormError(null);
    toast.success(`Loaded "${preset.label}" preset`);
  };

  const handleGenerateRange = (replace = false) => {
    setFormError(null);
    const start = parseInt(rangeStart.trim(), 10);
    const end = parseInt(rangeEnd.trim(), 10);
    const step = parseInt(rangeStep.trim(), 10);

    if (isNaN(start) || start <= 0 || isNaN(end) || end <= 0 || isNaN(step) || step <= 0) {
      setFormError("Start, End, and Step values must be positive integers.");
      return;
    }

    if (start > end) {
      setFormError("Start quantity cannot be greater than End quantity.");
      return;
    }

    if (step > end - start && start !== end) {
      setFormError("Step size is too large for the specified range.");
      return;
    }

    const generated: number[] = [];
    for (let current = start; current <= end; current += step) {
      generated.push(current);
      if (generated.length >= 100) break; // Safeguard
    }

    if (replace) {
      setQuantities(generated);
      toast.success(`Generated ${generated.length} batch quantities`);
    } else {
      const combined = Array.from(new Set([...quantities, ...generated])).sort((a, b) => a - b);
      setQuantities(combined);
      toast.success(`Appended ${generated.length} batch quantities`);
    }
  };

  const handleSaveAndClose = () => {
    if (quantities.length === 0) {
      setFormError("Please configure at least one batch quantity or apply a preset.");
      return;
    }

    // Check if there is pending valid input in singleQty
    let finalQuantities = [...quantities];
    const val = parseInt(singleQty.trim(), 10);
    if (!isNaN(val) && val > 0 && !quantities.includes(val)) {
      finalQuantities = [...finalQuantities, val].sort((a, b) => a - b);
    }

    onSave(finalQuantities);
    toast.success(`Saved ${finalQuantities.length} batch quantities`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-120 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-950/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4.5 border-b border-stone-100 bg-stone-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#E41F66]/10 text-[#E41F66] rounded-xl shrink-0">
              <Boxes size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900">
                Predefined Batch Quantities
              </h2>
              <p className="text-xs text-stone-500">
                Configure fixed ordering tiers (e.g. 25, 50, 75, 100 pcs) for buyers to select from.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-900 hover:bg-stone-100 p-2 rounded-full transition cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-left">
          {/* Section 1: Quick Presets */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
              <Sparkles size={13} className="text-amber-500" />
              Quick Presets
            </span>
            <div className="flex flex-wrap gap-2">
              {BATCH_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  title={preset.description}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-rose-50 hover:text-[#E41F66] border border-stone-200 hover:border-[#E41F66]/30 text-stone-700 text-xs font-semibold rounded-xl transition cursor-pointer select-none"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Add Quantity Form */}
          <div className="p-4.5 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <Plus size={14} className="text-[#E41F66]" />
                Add New Batch Quantity
              </span>
              <button
                type="button"
                onClick={() => setShowGenerator(!showGenerator)}
                className="text-xs font-medium text-[#E41F66] hover:underline cursor-pointer flex items-center gap-1"
              >
                <RefreshCw size={12} />
                {showGenerator ? "Hide Range Generator" : "Batch Range Generator"}
              </button>
            </div>

            {formError && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Single Add Input */}
            <form onSubmit={handleAddSingleQty} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={singleQty}
                  onChange={(e) => {
                    setSingleQty(e.target.value);
                    setFormError(null);
                  }}
                  placeholder="Enter pieces quantity (e.g. 125, 250, 500)"
                  className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-900 outline-none focus:border-[#E41F66] transition font-medium"
                />
              </div>
              <button
                type="submit"
                className="px-4.5 py-2.5 bg-stone-900 hover:bg-[#E41F66] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs shrink-0"
              >
                <Plus size={15} />
                <span>Add Quantity</span>
              </button>
            </form>

            {/* Range Generator Drawer */}
            {showGenerator && (
              <div className="p-4 rounded-xl border border-stone-200/80 bg-white space-y-3 mt-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="text-xs font-bold text-stone-800">
                    Generate Sequence / Range
                  </span>
                  <span className="text-[11px] text-stone-400">
                    Automatically create quantities with regular increments
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-500 mb-1">
                      Start Qty
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={rangeStart}
                      onChange={(e) => setRangeStart(e.target.value)}
                      className="w-full rounded-lg border border-stone-200 px-3 py-1.5 text-xs text-stone-900 outline-none focus:border-[#E41F66]"
                      placeholder="25"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-500 mb-1">
                      End Qty
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={rangeEnd}
                      onChange={(e) => setRangeEnd(e.target.value)}
                      className="w-full rounded-lg border border-stone-200 px-3 py-1.5 text-xs text-stone-900 outline-none focus:border-[#E41F66]"
                      placeholder="500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-500 mb-1">
                      Step Size
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={rangeStep}
                      onChange={(e) => setRangeStep(e.target.value)}
                      className="w-full rounded-lg border border-stone-200 px-3 py-1.5 text-xs text-stone-900 outline-none focus:border-[#E41F66]"
                      placeholder="25"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleGenerateRange(false)}
                    className="px-3 py-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-xs font-semibold text-stone-700 transition cursor-pointer"
                  >
                    Append to List
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGenerateRange(true)}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-[#E41F66] text-white text-xs font-semibold transition cursor-pointer"
                  >
                    Replace List with Range
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Configured Quantities */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers size={14} className="text-[#E41F66]" />
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Configured Batch Tiers
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E41F66]/10 text-[#E41F66]">
                  {quantities.length} {quantities.length === 1 ? "tier" : "tiers"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {quantities.length > 0 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setQuantities([...quantities].sort((a, b) => a - b))}
                      className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer"
                      title="Sort lowest to highest"
                    >
                      <ArrowUpDown size={11} />
                      <span>Sort</span>
                    </button>
                    <span className="text-stone-300">|</span>
                    <button
                      type="button"
                      onClick={() => setQuantities([...DEFAULT_BATCH_QUANTITIES])}
                      className="text-xs text-stone-500 hover:text-stone-800 cursor-pointer"
                    >
                      Reset Default
                    </button>
                    <span className="text-stone-300">|</span>
                    <button
                      type="button"
                      onClick={() => setQuantities([])}
                      className="text-xs text-rose-600 hover:underline cursor-pointer"
                    >
                      Clear All
                    </button>
                  </>
                )}
              </div>
            </div>

            {quantities.length === 0 ? (
              <div className="text-center py-8 px-4 rounded-2xl border border-dashed border-stone-200 bg-stone-50/50">
                <Boxes className="size-8 text-stone-300 mx-auto mb-2" />
                <p className="text-xs font-semibold text-stone-600">No batch quantities configured</p>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  Type a quantity above or click one of the quick presets to get started.
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/30">
                <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto pr-1">
                  {quantities.map((qty) => (
                    <div
                      key={qty}
                      className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:border-[#E41F66]/40 hover:bg-rose-50/30 transition-all shadow-2xs"
                    >
                      <span className="text-xs font-bold text-stone-900 font-mono">
                        {qty} <span className="text-[10px] font-normal text-stone-500">pcs</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveQty(qty)}
                        className="text-stone-300 group-hover:text-rose-600 hover:!text-rose-700 hover:bg-rose-100/80 p-0.5 rounded-md transition-colors cursor-pointer"
                        title={`Remove ${qty} pcs`}
                        aria-label={`Remove ${qty} pcs`}
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-stone-100 bg-stone-50/50">
          <span className="text-xs text-stone-500">
            {quantities.length} batch tier{quantities.length === 1 ? "" : "s"} configured
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-xs font-semibold text-stone-700 hover:bg-stone-100 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveAndClose}
              className="px-5 py-2.5 rounded-xl bg-stone-950 hover:bg-[#E41F66] text-xs font-bold text-white transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Check size={14} />
              <span>Save Batch Quantities</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductBatchQuantitiesModal);
