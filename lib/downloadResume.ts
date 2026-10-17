export function downloadResume() {
  const pdfUrl = "/Resume-Pranesh.M.pdf";
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = "Resume-Pranesh.M.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
