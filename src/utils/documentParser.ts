import mammoth from "mammoth"
import * as pdfjs from "pdfjs-dist"

// Ensure the worker is set up correctly
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

export async function parseDocument(file: File): Promise<string> {
  const fileExtension = file.name.split(".").pop()?.toLowerCase()

  switch (fileExtension) {
    case "txt":
      return await file.text()
    case "docx":
      const arrayBuffer = await file.arrayBuffer()
      const result = await mammoth.extractRawText({ arrayBuffer })
      return result.value
    case "pdf":
      return await parsePdf(file)
    default:
      throw new Error("Unsupported file type")
  }
}

async function parsePdf(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise
  let text = ""

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    const pageText = content.items.map((item: any) => item.str).join(" ")
    text += pageText + "\n"
  }

  return text
}

