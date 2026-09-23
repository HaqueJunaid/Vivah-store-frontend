import React, { useState, useEffect } from "react";
import { X, Plus, Trash2, Edit3, Ruler, Check, Layers, AlertCircle } from "lucide-react";
import type { ProductDimension } from "../../types/allTypes";
import toast from "react-hot-toast";

interface ProductDimensionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDimensions?: ProductDimension[];
  onSave: (dimensions: ProductDimension[]) => void;
}

const UNIT_OPTIONS = [
  { label: "Inches (in)", value: "in" },
  { label: "Centimeters (cm)", value: "cm" },
  { label: "Millimeters (mm)", value: "mm" },
];

const PRESET_TEMPLATES = [
  { label: "Standard Badge (58mm)", width: "58", height: "58", thickness: "4", unit: "mm" },
  { label: "Mini Badge (44mm)", width: "44", height: "44", thickness: "3", unit: "mm" },
  { label: "Invitation Suite (5 × 7 in)", width: "5", height: "7", thickness: "0.2", unit: "in" },
  { label: "Photo Card (4 × 6 in)", width: "4", height: "6", thickness: "0.1", unit: "in" },
  { label: "Square Card (6 × 6 in)", width: "6", height: "6", thickness: "0.2", unit: "in" },
];

export const formatDimensionString = (dim: ProductDimension): string => {
  const parts: string[] = [];
  if (dim.width) parts.push(`W: ${dim.width}`);
  if (dim.height) parts.push(`H: ${dim.height}`);
  if (dim.thickness) parts.push(`T: ${dim.thickness}`);
  const unit = dim.unit || "in";
  
  if (dim.width && dim.height) {
    let base = `${dim.width} × ${dim.height} ${unit}`;
    if (dim.thickness) {
      base += ` (Thick: ${dim.thickness} ${unit})`;
    }
    return base;
  }
  
  return parts.length > 0 ? `${parts.join(" • ")} ${unit}` : "Custom Size";
};

const ProductDimensionsModal: React.FC<ProductDimensionsModalProps> = ({
  isOpen,
  onClose,
  initialDimensions = [],
  onSave,
}) => {
  const [dimensions, setDimensions] = useState<ProductDimension[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form input fields for adding / editing a single dimension item
  const [label, setLabel] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [thickness, setThickness] = useState("");
  const [unit, setUnit] = useState("in");
  const [formError, setFormError] = useState<string | null>(null);

  // Sync initial dimensions when modal opens
  useEffect(() => {
    if (isOpen) {
      const normalized = (initialDimensions || []).map((d, index) => ({
        ...d,
        id: d.id || d._id || `dim-${Date.now()}-${index}`,
        unit: d.unit || "in",
      }));
      setDimensions(normalized);
      resetForm();
    }
  }, [isOpen, initialDimensions]);

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

  const resetForm = () => {
    setEditingId(null);
    setLabel("");
    setWidth("");
    setHeight("");
    setThickness("");
    setUnit("in");
    setFormError(null);
  };

  const handleApplyPreset = (preset: typeof PRESET_TEMPLATES[0]) => {
    setLabel(preset.label);
    setWidth(preset.width);
    setHeight(preset.height);
    setThickness(preset.thickness);
    setUnit(preset.unit);
    setFormError(null);
  };

  const handleStartEdit = (dim: ProductDimension) => {
    setEditingId(dim.id || dim._id || null);
    setLabel(dim.label || "");
    setWidth(String(dim.width || ""));
    setHeight(String(dim.height || ""));
    setThickness(String(dim.thickness || ""));
    setUnit(dim.unit || "in");
    setFormError(null);
  };

  const handleAddOrUpdateDimension = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!width.trim() && !height.trim() && !label.trim()) {
      setFormError("Please provide at least a label/name or width & height.");
      return;
    }

    const newItem: ProductDimension = {
      id: editingId || `dim-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      label: label.trim() || (width && height ? `${width} × ${height} ${unit}` : "Custom Size"),
      width: width.trim(),
      height: height.trim(),
      thickness: thickness.trim(),
      unit: unit.trim() || "in",
    };

    if (editingId) {
      setDimensions((prev) =>
        prev.map((item) => ((item.id || item._id) === editingId ? newItem : item))
      );
      toast.success("Dimension updated");
    } else {
      setDimensions((prev) => [...prev, newItem]);
      toast.success("Dimension added");
    }

    resetForm();
  };

  const handleRemoveDimension = (idToRemove: string) => {
    setDimensions((prev) => prev.filter((d) => (d.id || d._id) !== idToRemove));
    if (editingId === idToRemove) {
      resetForm();
    }
  };

  const handleSaveAndClose = () => {
    // If there is pending input in the fields not yet added, prompt or add it
    if ((width.trim() || height.trim() || label.trim()) && !editingId) {
      const pendingItem: ProductDimension = {
        id: `dim-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        label: label.trim() || (width && height ? `${width} × ${height} ${unit}` : "Custom Size"),
        width: width.trim(),
        height: height.trim(),
        thickness: thickness.trim(),
        unit: unit.trim() || "in",
      };
      const finalDimensions = [...dimensions, pendingItem];
      onSave(finalDimensions);
      toast.success(`${finalDimensions.length} dimension(s) saved`);
      onClose();
      return;
    }

    onSave(dimensions);
    toast.success(`${dimensions.length} dimension(s) saved`);
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

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4.5 border-b border-stone-100 bg-stone-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#E41F66]/10 text-[#E41F66] rounded-xl">
              <Ruler size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900">
                Product Dimensions &amp; Size Variations
              </h2>
              <p className="text-xs text-stone-500">
                Configure width, height, thickness and custom size options for buyers.
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

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-left">
          
          {/* Preset Quick-Pills */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
              Quick Presets
            </span>
            <div className="flex flex-wrap gap-2">
              {PRESET_TEMPLATES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-rose-50 hover:text-[#E41F66] border border-stone-200 hover:border-[#E41F66]/30 text-stone-700 text-xs font-semibold rounded-xl transition cursor-pointer select-none"
                >
                  + {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form to Add / Edit a Dimension */}
          <div className="p-4.5 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                {editingId ? <Edit3 size={14} className="text-amber-600" /> : <Plus size={14} className="text-[#E41F66]" />}
                {editingId ? "Edit Size Variation" : "Add New Size Variation"}
              </span>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs text-stone-500 hover:text-stone-800 underline cursor-pointer"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            {formError && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium flex items-center gap-2">
                <AlertCircle size={14} />
                <span>{formError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Variation Name / Label */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-600 mb-1">
                  Variation Name / Label
                </label>
                <input
                  type="text"
                  value={label}
                  onChange={(e) => {
                    setLabel(e.target.value);
                    setFormError(null);
                  }}
                  placeholder="e.g. Standard Size, Mini, 5 × 7 in Suite, Pocket Fold"
                  className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-900 outline-none focus:border-[#E41F66] transition"
                />
              </div>

              {/* Width */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">
                  Width
                </label>
                <input
                  type="text"
                  value={width}
                  onChange={(e) => {
                    setWidth(e.target.value);
                    setFormError(null);
                  }}
                  placeholder="e.g. 5, 58, 14.8"
                  className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-900 outline-none focus:border-[#E41F66] transition"
                />
              </div>

              {/* Height */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">
                  Height / Length
                </label>
                <input
                  type="text"
                  value={height}
                  onChange={(e) => {
                    setHeight(e.target.value);
                    setFormError(null);
                  }}
                  placeholder="e.g. 7, 58, 21.0"
                  className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-900 outline-none focus:border-[#E41F66] transition"
                />
              </div>

              {/* Thickness */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">
                  Thickness (Optional)
                </label>
                <input
                  type="text"
                  value={thickness}
                  onChange={(e) => setThickness(e.target.value)}
                  placeholder="e.g. 0.2, 4, 350 GSM"
                  className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-900 outline-none focus:border-[#E41F66] transition"
                />
              </div>

              {/* Unit */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">
                  Measurement Unit
                </label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-900 outline-none focus:border-[#E41F66] transition cursor-pointer"
                >
                  {UNIT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => handleAddOrUpdateDimension()}
                className="px-4 py-2 bg-stone-900 hover:bg-[#E41F66] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                {editingId ? <Check size={14} /> : <Plus size={14} />}
                <span>{editingId ? "Update Dimension" : "Add Dimension to List"}</span>
              </button>
            </div>
          </div>

          {/* Configured Dimensions List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
                <Layers size={14} className="text-[#E41F66]" />
                Configured Sizes ({dimensions.length})
              </span>
              {dimensions.length > 0 && (
                <button
                  type="button"
                  onClick={() => setDimensions([])}
                  className="text-xs text-rose-600 hover:underline cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {dimensions.length === 0 ? (
              <div className="text-center py-8 px-4 rounded-2xl border border-dashed border-stone-200 bg-stone-50/50">
                <Ruler className="size-8 text-stone-300 mx-auto mb-2" />
                <p className="text-xs font-semibold text-stone-600">No dimensions added yet</p>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  Use the form above or pick a quick preset to add size variations.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {dimensions.map((dim, idx) => {
                  const dimId = dim.id || dim._id || `dim-${idx}`;
                  const isCurrentEdit = editingId === dimId;
                  const formatted = formatDimensionString(dim);

                  return (
                    <div
                      key={dimId}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                        isCurrentEdit
                          ? "border-amber-400 bg-amber-50/40 ring-1 ring-amber-400/30"
                          : "border-stone-200 bg-white hover:border-stone-300"
                      }`}
                    >
                      <div className="min-w-0 pr-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-stone-900 truncate">
                            {dim.label || `Size ${idx + 1}`}
                          </span>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                            {dim.unit || "in"}
                          </span>
                        </div>
                        <p className="text-xs text-[#E41F66] font-semibold mt-0.5 font-mono">
                          {formatted}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(dim)}
                          className="p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition cursor-pointer"
                          title="Edit size"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveDimension(dimId)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                          title="Delete size"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-stone-100 bg-stone-50/50">
          <span className="text-xs text-stone-500">
            {dimensions.length} size variation{dimensions.length === 1 ? "" : "s"} ready
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
              className="px-5 py-2.5 rounded-xl bg-stone-950 hover:bg-[#E41F66] text-xs font-bold text-white transition-colors cursor-pointer shadow-xs"
            >
              Save Dimensions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductDimensionsModal);
