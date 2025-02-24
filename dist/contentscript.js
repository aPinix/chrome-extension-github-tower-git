(() => {
  // vars --------------------

  const debug = false;

  // utils --------------------

  const getElementsByText = (findString, tag = 'a', caseSensitive = false, trim = true) => {
    const elements = document.querySelectorAll(tag);
    const normalizedFindString = caseSensitive ? findString : findString.toLowerCase();
    return Array.from(elements).filter((el) => {
      let content = caseSensitive ? el.textContent : el.textContent.toLowerCase();
      if (trim) content = content.trim();
      return content.includes(normalizedFindString);
    });
  };

  // More specific selector for SSH tab
  const getSSHTab = () => {
    const tab = getElementsByText('SSH', 'li>a')[0];
    debug && console.log('[Tower] Looking for SSH tab', tab || 'not found');
    return tab;
  };

  // More specific selector for download button
  const getDownloadButton = () => {
    const button = getElementsByText('Download', 'ul>li')[0];
    debug && console.log('[Tower] Looking for download button', button || 'not found');
    return button;
  };

  const initGitHubTower = () => {
    const buttonCode = getElementsByText('Code', 'button[type="button"]')[0];
    if (!buttonCode) {
      debug && console.log('[Tower] Code button not found, exiting...');
      return;
    }

    const createTowerButton = (sshValue) => {
      debug && console.log('[Tower] Creating Tower button with SSH value:', sshValue);

      const downloadButton = getDownloadButton();

      // Clone and modify the "Download" button
      const towerButton = downloadButton.cloneNode(true);
      const spanElement = Array.from(towerButton.querySelectorAll('span')).find((span) => span.textContent.includes('Download'));
      if (spanElement) spanElement.textContent = 'Open with Tower';

      // const svgString = `<svg aria-hidden="true" focusable="false" role="img" class="octicon octicon-desktop-download" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
      //   <path d="m4.927 5.427 2.896 2.896a.25.25 0 0 0 .354 0l2.896-2.896A.25.25 0 0 0 10.896 5H8.75V.75a.75.75 0 1 0-1.5 0V5H5.104a.25.25 0 0 0-.177.427Z"></path>
      //   <path d="M1.573 2.573a.25.25 0 0 0-.073.177v7.5a.25.25 0 0 0 .25.25h12.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25h-3a.75.75 0 1 1 0-1.5h3A1.75 1.75 0 0 1 16 2.75v7.5A1.75 1.75 0 0 1 14.25 12h-3.727c.099 1.041.52 1.872 1.292 2.757A.75.75 0 0 1 11.25 16h-6.5a.75.75 0 0 1-.565-1.243c.772-.885 1.192-1.716 1.292-2.757H1.75A1.75 1.75 0 0 1 0 10.25v-7.5A1.75 1.75 0 0 1 1.75 1h3a.75.75 0 0 1 0 1.5h-3a.25.25 0 0 0-.177.073ZM6.982 12a5.72 5.72 0 0 1-.765 2.5h3.566a5.72 5.72 0 0 1-.765-2.5H6.982Z"></path>
      // </svg>`;

      const svgString = `<svg aria-hidden="true" focusable="false" role="img" class="octicon octicon-desktop-download" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
        <path d="M14.1299 0H1.87013C1.56759 0 1.4579 0.0334645 1.34729 0.0963221C1.23667 0.159166 1.14987 0.251389 1.09063 0.368907C1.03149 0.486424 1 0.602993 1 0.924447V1.55443C1 1.87588 1.03149 1.99245 1.09063 2.10997C1.14987 2.22748 1.23667 2.31971 1.34729 2.38255C1.4579 2.44541 1.56759 2.47887 1.87013 2.47887H14.1299C14.4324 2.47887 14.5421 2.44541 14.6527 2.38255C14.7633 2.31971 14.8501 2.22748 14.9094 2.10997C14.9685 1.99245 15 1.87588 15 1.55443V0.924447C15 0.602993 14.9685 0.486424 14.9094 0.368907C14.8501 0.251389 14.7633 0.159166 14.6527 0.0963221C14.5421 0.0334645 14.4324 0 14.1299 0Z"/>
        <path d="M5.82451 7.43662L5.82431 7.43519L9.92525 7.43662L10.3465 7.43615L10.3463 7.43747L12.6253 7.43778L13.8024 3.16569L13.8029 3.16383L13.8036 3.16131L13.805 3.15686L10.9898 3.15608L10.6082 3.15493H2.19515L3.37932 7.43633L5.82451 7.43662Z"/>
        <path d="M6.53991 15.8026C6.39148 14.5306 6.06367 13.3194 5.55667 12.169H10.4355C9.92846 13.3194 9.60065 14.5306 9.45222 15.8026C9.43897 15.9152 9.34906 15.9997 9.24228 16H6.74985C6.64307 15.9997 6.55316 15.9152 6.53991 15.8026Z"/>
        <path d="M12.8034 11.0838C12.6944 11.2482 12.648 11.3008 12.5883 11.3514C12.5286 11.4021 12.4644 11.4375 12.391 11.4602C12.3532 11.4719 12.3172 11.4802 12.2654 11.4855C12.2164 11.4906 12.1532 11.493 12.0612 11.493H3.93894C3.7497 11.493 3.68248 11.4829 3.60915 11.4602C3.53572 11.4375 3.4715 11.4021 3.41174 11.3514C3.35208 11.3008 3.30568 11.2482 3.19661 11.0838L2.42633 9.92186L2.42198 9.91537L13.5781 9.91515L12.8034 11.0838Z"/>
        <path d="M13.2066 7.94328C13.13 7.90615 13.056 7.88732 12.8527 7.88732H3.14731C2.944 7.88732 2.87015 7.90615 2.7934 7.94328C2.71675 7.98041 2.65388 8.03586 2.60541 8.10909C2.55694 8.18233 2.52586 8.25602 2.48837 8.4683L2.32193 9.41159C2.3184 9.43163 2.3154 9.44943 2.31281 9.46539H13.6873C13.6847 9.44943 13.6817 9.43163 13.6782 9.41159L13.5116 8.4683C13.4742 8.25602 13.4432 8.18233 13.3947 8.10909C13.3462 8.03586 13.2834 7.98041 13.2066 7.94328Z"/>
      </svg>`;

      const spanWithSvg = towerButton.querySelector('span:has(svg)');
      if (spanWithSvg) spanWithSvg.innerHTML = svgString;

      towerButton.addEventListener('click', () => {
        window.location.href = `gittower://openRepo/${encodeURIComponent(sshValue)}`;
      });
      return towerButton;
    };

    buttonCode.addEventListener('click', async () => {
      debug && console.log('[Tower] Code button clicked');

      // Wait for modal to open
      debug && console.log('[Tower] Waiting for modal to open...');
      await new Promise((resolve) => setTimeout(resolve, 50));

      const sshTab = getSSHTab();
      if (!sshTab) {
        debug && console.log('[Tower] SSH tab not found, exiting...');
        return;
      }

      debug && console.log('[Tower] Clicking SSH tab');
      sshTab.click();

      // Wait for tab content to load
      debug && console.log('[Tower] Waiting for tab content to load...');
      await new Promise((resolve) => setTimeout(resolve, 50));

      const sshInput = document.querySelector('input[type="text"][id*="clone-with-"]');
      debug && console.log('[Tower] Found SSH input:', sshInput?.value || 'not found');

      const downloadButton = getDownloadButton();

      if (!downloadButton?.parentNode || !sshInput?.value) {
        debug &&
          console.log('[Tower] Missing required elements, exiting...', {
            downloadButton: !!downloadButton,
            parentNode: !!downloadButton?.parentNode,
            sshValue: !!sshInput?.value,
          });
        return;
      }

      debug && console.log('[Tower] Inserting Tower button');
      downloadButton.parentNode.insertBefore(createTowerButton(sshInput.value), downloadButton);
      debug && console.log('[Tower] Tower button inserted successfully');
    });
  };

  // Initial setup
  const init = () => {
    debug && console.log('[Tower] Initializing extension');
    initGitHubTower();

    // Watch for GitHub's navigation events
    let lastUrl = location.href;

    // Create an observer instance to watch for URL changes
    const observer = new MutationObserver(() => {
      if (lastUrl !== location.href) {
        debug && console.log('[Tower] URL changed from', lastUrl, 'to', location.href);
        lastUrl = location.href;
        initGitHubTower();
      }
    });

    // Start observing the document body for any changes
    debug && console.log('[Tower] Setting up navigation observer');
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  };

  // Run on initial load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
