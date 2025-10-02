from app.models import Content, Question, Scenario
from typing import List

async def generate_questions_from_content(content: Content) -> List[Question]:
    """
    Stub function for generating questions from content.
    Later integrate with AI APIs like Gemini or OpenAI.
    For now, returns a sample question.
    """
    # Sample question generation
    question = Question(
        content_id=content.id,
        question=f"What is the main topic discussed in the content about '{content.topic}'?",
        options=[
            content.topic,
            "Something else",
            "Not sure",
            "None of the above"
        ],
        correct_answer=0,
        explanation="This is a sample question. In production, use AI to generate meaningful questions."
    )
    return [question]

async def generate_scenarios_from_content(content: Content) -> List[Scenario]:
    """
    Stub function for generating scenarios from content.
    Later integrate with AI APIs.
    For now, returns a sample scenario.
    """
    scenario = Scenario(
        content_id=content.id,
        situation=f"Imagine you are studying about {content.topic}.",
        question="What would you do in this situation?",
        options=[
            "Follow the constitution",
            "Ignore it",
            "Ask for advice",
            "None"
        ],
        correct_answer=0,
        explanation="Sample scenario. Integrate AI for real generation."
    )
    return [scenario]