export const DEFAULT_BATCH_QUANTITIES = [
  25, 50, 75, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000,
];

export const BATCH_PRESETS = [
  {
    label: "Standard (25 - 1000)",
    description: "25, 50, 75, 100... up to 1000 pcs",
    quantities: DEFAULT_BATCH_QUANTITIES,
  },
  { label: "Small Batches (10 - 250)", description: "10, 20, 30, 40, 50, 75, 100, 150, 200, 250 pcs", quantities: [10, 20, 30, 40, 50, 75, 100, 150, 200, 250] },
  { label: "Micro Packs (5 - 50)", description: "5, 10, 15, 20, 25, 30, 35, 40, 45, 50 pcs", quantities: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50] },
  { label: "Wholesale Bulk (100 - 10k)", description: "100, 250, 500, 1000, 2500, 5000, 10000 pcs", quantities: [100, 250, 500, 1000, 2500, 5000, 10000] },
  { label: "Multiples of 10 (10 - 100)", description: "10, 20, 30... 100 pcs", quantities: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100] },
  { label: "Multiples of 50 (50 - 500)", description: "50, 100, 150... 500 pcs", quantities: [50, 100, 150, 200, 250, 300, 350, 400, 450, 500] },
  { label: "Multiples of 100 (100 - 1000)", description: "100, 200, 300... 1000 pcs", quantities: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000] },
];
