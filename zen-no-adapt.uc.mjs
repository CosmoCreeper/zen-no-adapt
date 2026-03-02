// Just don't adapt.

const waitForDependencies = () => {
  return new Promise((resolve) => {
    const id = setInterval(() => {
      const deps = ["gZenThemePicker"];

      let depsExist = true;
      for (const dep of deps) {
        if (!window.hasOwnProperty(dep)) {
          depsExist = false;
        }
      }

      if (depsExist) {
        clearInterval(id);
        resolve();
      }
    }, 50);
  });
};
await waitForDependencies();

// Replace default dark mode detection with no adaptation method
const oldDarkDetect = gZenThemePicker.shouldBeDarkMode;
gZenThemePicker.shouldBeDarkMode = () => gZenThemePicker.isDarkMode;

// Refresh color scheme using new behavior
gZenThemePicker.onWorkspaceChange(gZenWorkspaces.getActiveWorkspace());

window.addUnloadListener(() => {
  // Reset dark mode detection to default behavior
  gZenThemePicker.shouldBeDarkMode = oldDarkDetect;
  // Refresh color scheme using default behavior
  gZenThemePicker.onWorkspaceChange(gZenWorkspaces.getActiveWorkspace());
});
