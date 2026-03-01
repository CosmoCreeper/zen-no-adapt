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
gZenThemePicker.shouldBeDarkMode = () => {
  const colorScheme = Services.prefs.getIntPref("zen.view.window.scheme");
  if (colorScheme === 0) {
    return true;
  } else if (colorScheme === 1) {
    return false;
  } else {
    // Automatically detect color scheme
    oldDarkDetect();
  }
};

// Refresh color scheme using new behavior
gZenThemePicker.onWorkspaceChange(gZenWorkspaces.getActiveWorkspace());

window.addUnloadListener(() => {
  // Reset dark mode detection to default behavior
  gZenThemePicker.shouldBeDarkMode = oldDarkDetect;
  // Refresh color scheme using default behavior
  gZenThemePicker.onWorkspaceChange(gZenWorkspaces.getActiveWorkspace());
});
