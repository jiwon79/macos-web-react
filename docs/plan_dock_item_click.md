# DockItem Click Logic Implementation Plan

## Overview
Fix the DockItem click behavior in `/src/domains/dock/views/Dock/Dock.tsx` to properly handle three scenarios when clicking on an app icon in the dock.

## Current Issues

### 1. Incorrect Window Focus Logic (Line 61)
- **Problem**: `setFocusedWindowID(appID)` uses `appID` instead of window's unique `id`
- **Impact**: Focus management fails because `setFocusedWindowID` expects a window ID, not an application ID

### 2. Incorrect Minimized Window Check (Line 56)
- **Problem**: Checking `window.id === appID` instead of matching by application type
- **Impact**: Minimized windows are never properly detected

### 3. Missing Active Window Focus
- **Problem**: No logic to focus already-open windows that aren't minimized
- **Impact**: Clicking dock icon for open app doesn't bring it to front

## Implementation Strategy

### Step 1: Fix `onClickDockItem` Function
Update the function to properly handle all three cases:

```typescript
const onClickDockItem = (appID: ApplicationID) => {
  // Case 1: Check if app has minimized windows
  const minimizedWindow = minimizedWindows.find(w => 
    // Need to check how minimized windows store appID
  );
  
  // Case 2: Check if app has active windows
  const activeWindow = windows.find(w => w.appID === appID);
  
  // Case 3: Handle each scenario
  if (minimizedWindow) {
    // Restore minimized window
    onRestoreWindow(minimizedWindow.id);
  } else if (activeWindow) {
    // Focus existing window
    setFocusedWindowID(activeWindow.id);
  } else {
    // Create new window
    createAppWindow(appID);
  }
}
```

### Step 2: Verify MinimizedWindow Structure
Need to confirm how `MinimizedWindow` relates to `appID`:
- Check if minimized windows retain `appID` reference
- May need to update `MinimizedWindow` interface if `appID` is missing

### Step 3: Update All DockItem Components
Ensure all dock items have proper click handlers:
- Finder (line 98)
- Calculator (line 100-104)
- Trash (line 118)

## Files to Modify

1. **`/src/domains/dock/views/Dock/Dock.tsx`**
   - Fix `onClickDockItem` function (lines 50-62)
   - Add click handlers to Finder and Trash items

2. **`/src/domains/window/interface/window.ts`** (if needed)
   - Add `appID` to `MinimizedWindow` interface if missing

## Testing Scenarios

1. **App Not Running**
   - Click dock icon � Should create new window

2. **App Running (Not Minimized)**
   - Click dock icon � Should focus the window

3. **App Minimized**
   - Click dock icon � Should restore with genie animation

4. **Multiple Windows of Same App** (future enhancement)
   - Consider cycle through windows or show window picker

## Expected Behavior

After implementation:
- Clicking Calculator when closed � Opens new Calculator window
- Clicking Calculator when open � Focuses Calculator window
- Clicking Calculator when minimized � Restores with animation
- Same behavior for all dock apps (Finder, Trash, etc.)