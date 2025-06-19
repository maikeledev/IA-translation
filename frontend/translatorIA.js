document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id)
  const englishBtn = $("englishBtn")
  const spanishBtn = $("spanishBtn")
  const originalText = $("originalText")
  const translatedText = $("translatedText")
  const translateBtn = $("translateBtn")
  const improveBtn = $("improveBtn")
  const languageSelectorTitle = $("language-selector-title")
  const clearBtn = $("clearBtn")

  const state = {
    selectedLanguage: "English",
    backendUrl: "http://localhost:3001/api/translateText",
  }

  function setText(el, text) {
    el.textContent = text
  }

  function updateLanguageUI() {
    ;[englishBtn, spanishBtn].forEach((btn) =>
      btn.classList.toggle("active", btn === getActiveLangBtn())
    )
    translateBtn.textContent =
      state.selectedLanguage === "English" ? "Traducir" : "Translate"
    improveBtn.textContent =
      state.selectedLanguage === "English"
        ? "Mejorar Ingles"
        : "Improve Spanish"
    languageSelectorTitle.textContent =
      state.selectedLanguage === "English" ? "Traducir a:" : "Translate to:"
    setText(
      translatedText,
      state.selectedLanguage === "English"
        ? "traducción aquí..."
        : "translation here..."
    )
  }

  function getActiveLangBtn() {
    return state.selectedLanguage === "English" ? englishBtn : spanishBtn
  }

  ;[englishBtn, spanishBtn].forEach((btn) => {
    btn.addEventListener("click", () => {
      state.selectedLanguage = btn === englishBtn ? "English" : "Spanish"
      updateLanguageUI()
      updateActionButtonsState()
    })
  })

  function updateActionButtonsState() {
    const hasText = originalText.value.trim().length > 0
    translateBtn.disabled = !hasText
    improveBtn.disabled = !hasText
  }

  clearBtn.addEventListener("click", () => {
    originalText.value = ""
    translatedText.innerHTML = ""
    updateActionButtonsState()
  })

  originalText.addEventListener("input", updateActionButtonsState)

  async function translateTextApiCall({ text, language, action }) {
    try {
      const response = await fetch(state.backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language, action }),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return data.result.result
    } catch (error) {
      throw new Error("Could not connect to the server.")
    }
  }

  function renderImproveResult(result) {
    const intro = document.createElement("p")
    intro.id = "intro-improve"
    intro.textContent = result.resultList[0].explanation

    const ul = document.createElement("ul")
    result.resultList.forEach(({ option, explanation }) => {
      const li = document.createElement("li")
      const h2 = document.createElement("h2")
      h2.textContent = option
      const p = document.createElement("p")
      p.textContent = explanation
      li.appendChild(h2)
      li.appendChild(p)
      ul.appendChild(li)
    })

    translatedText.innerHTML = ""
    translatedText.appendChild(intro)
    translatedText.appendChild(ul)
  }

  async function handleAction(action) {
    const text = originalText.value.trim()
    if (!text) return
    translatedText.innerHTML =
      '<span class="loading-spinner">Traduciendo...</span>'
    try {
      const result = await translateTextApiCall({
        text,
        language: state.selectedLanguage,
        action,
      })

      const resultObject = JSON.parse(result)

      if (action === "improve" || resultObject.resultList?.length > 0) {
        renderImproveResult(resultObject)
      } else {
        setText(translatedText, resultObject.resultText)
      }
    } catch (error) {
      setText(
        translatedText,
        error.message || "Error: Unable to process the request."
      )
    }
  }

  translateBtn.addEventListener("click", () => handleAction("translate"))
  improveBtn.addEventListener("click", () => handleAction("improve"))

  // Initial UI state
  updateLanguageUI()
  updateActionButtonsState()
})
