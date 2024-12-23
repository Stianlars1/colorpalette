export const usePaletteStorage = () => {
  const savePalette = (cssVariables: string) => {
    localStorage.setItem("colorPalette", cssVariables);
  };

  const loadPalette = () => {
    return localStorage.getItem("colorPalette");
  };

  const loadPaletteStorageTheme = () => {
    const themes = localStorage.getItem("apply_theme_to_document");
    const root = document.documentElement;

    if (themes) {
      const { radix, shadcn } = JSON.parse(themes);
      // @ts-ignore
      radix.forEach(([variable, value]) => {
        root.style.setProperty(variable, value);
      });

      // @ts-ignore
      shadcn.forEach(([variable, value]) => {
        root.style.setProperty(variable, value);
      });
      return [radix, shadcn];
    }
    return [];
  };

  return { savePalette, loadPalette, loadPaletteStorageTheme };
};
