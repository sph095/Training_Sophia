from pathlib import Path

import gradio as gr

from src.meeting_prep.agent import run_prep_agent
from src.meeting_prep.render import render_brief_html

OUTPUT_DIR = Path("output")
OUTPUT_DIR.mkdir(exist_ok=True)


def generate_brief(user_prompt):
    if isinstance(user_prompt, list):
        user_prompt = " ".join([str(item) for item in user_prompt if item])
    elif not isinstance(user_prompt, str):
        user_prompt = str(user_prompt or "")

    if not user_prompt.strip():
        return "⚠️ Please enter who you are meeting.", None

    try:
        md_result = run_prep_agent(user_prompt)
        final_html = render_brief_html(md_result)

        file_path = OUTPUT_DIR / "meeting_brief.html"
        file_path.write_text(final_html, encoding="utf-8")

        return md_result, str(file_path)
    except Exception as err:
        return f"### ❌ Error during research:\n```text\n{str(err)}\n```", None


custom_css = """
.gradio-container {
    max-width: 980px !important;
    margin: auto !important;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
}
.hero-card {
    background: radial-gradient(circle at 80% 30%, rgba(249, 115, 22, 0.45) 0%, rgba(15, 60, 80, 0.95) 45%, #052636 100%);
    border-radius: 18px;
    padding: 36px 42px;
    color: white;
    margin-bottom: 24px;
    box-shadow: 0 10px 25px -5px rgba(5, 38, 54, 0.3);
}
.hero-badge {
    display: inline-block;
    padding: 4px 14px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.25);
    font-size: 11px;
    letter-spacing: 1.5px;
    font-weight: 700;
    margin-bottom: 14px;
    color: #e2e8f0;
}
.hero-title { font-size: 32px; font-weight: 800; margin-bottom: 10px; color: #ffffff; }
.hero-title span { color: #f59e0b; }
.hero-subtitle { font-size: 15px; line-height: 1.5; color: #cbd5e1; max-width: 650px; }
.input-pill {
    display: inline-block;
    background: #ccfbf1;
    color: #0f766e;
    font-weight: 700;
    font-size: 12px;
    padding: 4px 14px;
    border-radius: 14px;
    margin-bottom: 8px;
}
#prep_btn {
    background: #0d9488 !important;
    color: white !important;
    font-size: 15px !important;
    font-weight: 600 !important;
    border-radius: 10px !important;
    height: 52px !important;
    border: none !important;
}
#prep_btn:hover { background: #0f766e !important; }
.try-label { font-size: 13px; font-weight: 700; color: #0d9488; margin: 14px 0 8px 0; }
.chip-btn {
    background: #f8fafc !important;
    border: 1px solid #e2e8f0 !important;
    border-radius: 8px !important;
    font-size: 12px !important;
    color: #475569 !important;
    padding: 6px 12px !important;
    text-align: left !important;
}
"""

with gr.Blocks(title="Client Meeting Prep Agent", css=custom_css) as demo:
    gr.HTML(
        """
        <div class="hero-card">
            <div class="hero-badge">AI &bull; FREE &bull; SOURCED</div>
            <div class="hero-title">Client Meeting <span>Prep Agent</span></div>
            <div class="hero-subtitle">
                Tell me who you're meeting. I'll search the web, read the pages, and hand you a one-page brief with talking points &mdash; every fact tagged with its source.
            </div>
        </div>
        """
    )

    with gr.Row():
        with gr.Column(scale=9):
            gr.HTML('<div class="input-pill">Who are you meeting?</div>')
            prompt_input = gr.Textbox(
                value="I'm meeting the CTO of HDFC Bank tomorrow. What should I know?",
                placeholder="e.g. I'm meeting the CTO of HDFC Bank tomorrow. What should I know?",
                lines=2,
                show_label=False,
                container=False,
            )
        with gr.Column(scale=2, min_width=130):
            gr.HTML('<div style="height: 28px;"></div>')
            prep_btn = gr.Button("Prep me ✨", elem_id="prep_btn")

    gr.HTML('<div class="try-label">≡ Try one</div>')
    with gr.Row():
        ex1 = gr.Button("I'm meeting the CTO of HDFC Bank tomorrow. What should I know?", elem_classes=["chip-btn"])
        ex2 = gr.Button("I'm meeting Barclays' CTO tomorrow. What should I know?", elem_classes=["chip-btn"])
    with gr.Row():
        ex3 = gr.Button("Tomorrow I'm meeting the CTO of DBS Bank about cloud and AI...", elem_classes=["chip-btn"])
        ex4 = gr.Button("I have a call with the CTO of Standard Chartered tomorrow. What should I know?", elem_classes=["chip-btn"])

    with gr.Column():
        gr.HTML('<div style="margin-top: 20px;"></div>')
        download_btn = gr.File(label="📥 Download One-Page Brief (.html)", interactive=False)
        output_display = gr.Markdown(
            value="*Your sourced executive brief will appear here once ready.*"
        )

    ex1.click(fn=lambda: "I'm meeting the CTO of HDFC Bank tomorrow. What should I know?", outputs=prompt_input)
    ex2.click(fn=lambda: "I'm meeting Barclays' CTO tomorrow. What should I know?", outputs=prompt_input)
    ex3.click(fn=lambda: "Tomorrow I'm meeting the CTO of DBS Bank about cloud and AI...", outputs=prompt_input)
    ex4.click(fn=lambda: "I have a call with the CTO of Standard Chartered tomorrow. What should I know?", outputs=prompt_input)

    prep_btn.click(
        fn=generate_brief,
        inputs=[prompt_input],
        outputs=[output_display, download_btn],
    )

if __name__ == "__main__":
    demo.launch(server_name="127.0.0.1")
