import React, { useRef, useState } from "react"
import { useNavigate } from "react-router-dom" // <-- replaces next/navigation
import * as pdfjsLib from "pdfjs-dist"

// This tells pdf.js where to find the worker file
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js"

import mammoth from "mammoth/mammoth.browser"

// UI Components – replace these with your actual UI library or plain HTML
import { Dialog, DialogTrigger, DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"


// Helpers
const readAsArrayBuffer = (file) =>
  new Promise((res, rej) => {
    const fr = new FileReader()
    fr.onload = () => res(fr.result)
    fr.onerror = rej
    fr.readAsArrayBuffer(file)
  })

const readAsText = (file) =>
  new Promise((res, rej) => {
    const fr = new FileReader()
    fr.onload = () => res(fr.result)
    fr.onerror = rej
    fr.readAsText(file)
  })

async function extractPdfText(arrayBuffer) {
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
  let text = ""
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    text += content.items.map((it) => it.str).join(" ") + "\n"
  }
  return text
}

async function extractDocxText(arrayBuffer) {
  const { value } = await mammoth.extractRawText({ arrayBuffer })
  return value || ""
}

function sanitize(text) {
  return (text || "").replace(/\s+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim()
}

const ResumeDialog = () => {
  const navigate = useNavigate()
  const fileRef = useRef(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState("")

  const onSubmit = async (e) => {
    e.preventDefault()
    setErr("")
    const file = fileRef.current?.files?.[0]
    if (!file) {
      setErr("Please choose a resume file (PDF/DOC/DOCX).")
      return
    }

    try {
      setBusy(true)
      const ext = file.name.toLowerCase()
      let rawText = ""

      if (ext.endsWith(".pdf")) {
        const ab = await readAsArrayBuffer(file)
        rawText = await extractPdfText(ab)
      } else if (ext.endsWith(".docx")) {
        const ab = await readAsArrayBuffer(file)
        rawText = await extractDocxText(ab)
      } else if (ext.endsWith(".doc") || file.type === "text/plain") {
        rawText = await readAsText(file)
      } else {
        throw new Error("Unsupported file type. Use PDF, DOCX, or TXT.")
      }

      const resumeText = sanitize(rawText)
      if (!resumeText || resumeText.length < 40) {
        throw new Error("Could not read meaningful text from the file.")
      }

      // Store temporarily
      sessionStorage.setItem("resume_text_for_analysis", resumeText)

      // Navigate to analysis page
      navigate("/resume-analysis")
    } catch (e) {
      setErr(e.message || "Failed to read file.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex-1" disabled={busy}>
          {busy ? "Reading..." : "Analyze Resume"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Your Resume</DialogTitle>
          <DialogDescription>
            Analyze your resume with on-device parsing and AI.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-6" onSubmit={onSubmit}>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
            className="w-full border rounded p-2"
          />

          {err && <p className="text-sm text-red-600">{err}</p>}

          <DialogFooter>
            <Button type="submit" className="cursor-pointer" disabled={busy}>
              {busy ? "Processing..." : "Submit Resume"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ResumeDialog
