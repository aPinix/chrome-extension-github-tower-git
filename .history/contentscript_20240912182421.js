const getElementsByText = (findString, tag = 'a', caseSensitive = false, trim = true) => {
  const elements = document.querySelectorAll(tag);
  const normalizedFindString = caseSensitive ? findString : findString.toLowerCase();
  return Array.from(elements).filter((el) => {
    let content = caseSensitive ? el.textContent : el.textContent.toLowerCase();
    if (trim) content = content.trim();
    return content.includes(normalizedFindString);
  });
};

const buttonCodeElement = getElementsByText('Code', 'button[type="button"]')[0];
if (!buttonCodeElement) return; // Early exit if the button is not found

buttonCodeElement.addEventListener('click', async () => {
  await new Promise((resolve) => setTimeout(resolve, 100)); // Simplifying timeouts with promises

  const sshTab = getElementsByText('SSH', 'li>a')[0];
  if (!sshTab) return;

  sshTab.click();

  await new Promise((resolve) => setTimeout(resolve, 100)); // Simplifying with another promise

  const sshInput = document.querySelector('input[type="text"][aria-label*="git@github.com"]');
  const sshValue = sshInput ? sshInput.value : null;
  const buttonDownload = getElementsByText('Download', 'ul[role="menu"]>li')[0];

  if (!buttonDownload || !sshValue) return;

  // Clone and modify the "Download" button
  const buttonDownloadClone = buttonDownload.cloneNode(true);
  const spanElement = Array.from(buttonDownloadClone.querySelectorAll('span')).find((span) => span.textContent.includes('Download'));
  if (spanElement) spanElement.textContent = 'Open with Tower';

  const svgString = `<svg aria-hidden="true" focusable="false" role="img" class="octicon octicon-desktop-download" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
    <path d="m4.927 5.427 2.896 2.896a.25.25 0 0 0 .354 0l2.896-2.896A.25.25 0 0 0 10.896 5H8.75V.75a.75.75 0 1 0-1.5 0V5H5.104a.25.25 0 0 0-.177.427Z"></path>
    <path d="M1.573 2.573a.25.25 0 0 0-.073.177v7.5a.25.25 0 0 0 .25.25h12.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25h-3a.75.75 0 1 1 0-1.5h3A1.75 1.75 0 0 1 16 2.75v7.5A1.75 1.75 0 0 1 14.25 12h-3.727c.099 1.041.52 1.872 1.292 2.757A.75.75 0 0 1 11.25 16h-6.5a.75.75 0 0 1-.565-1.243c.772-.885 1.192-1.716 1.292-2.757H1.75A1.75 1.75 0 0 1 0 10.25v-7.5A1.75 1.75 0 0 1 1.75 1h3a.75.75 0 0 1 0 1.5h-3a.25.25 0 0 0-.177.073ZM6.982 12a5.72 5.72 0 0 1-.765 2.5h3.566a5.72 5.72 0 0 1-.765-2.5H6.982Z"></path>
  </svg>`;

  const spanWithSvg = buttonDownloadClone.querySelector('span:has(svg)');
  if (spanWithSvg) spanWithSvg.innerHTML = svgString;

  buttonDownloadClone.addEventListener('click', () => {
    window.location.href = 'gittower://openRepo/' + encodeURIComponent(sshValue);
  });

  buttonDownload.parentNode.insertBefore(buttonDownloadClone, buttonDownload);
});
