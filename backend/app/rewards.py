# Reward rules for the gamified learning platform
REWARD_RULES = {
    "completed_module": 15,      # Completed a learning module
    "completed_lesson": 5,       # Completed a single lesson
    "quiz_correct": 10,          # Quiz correct answer
    "quiz_attempted": 5,         # Partial correct / attempted
    "played_game": 8,            # Played a challenge/game
    "spin_wheel_correct": 3,     # Correct answer in spin wheel
    "spin_wheel_attempted": 1,   # Attempted answer in spin wheel
    "daily_streak": 5,           # Consistent daily usage streak
    "improved_score": 10,        # Improved score compared to previous attempt
    "inactive_penalty": -5,      # Inactive for 3+ days
    "user_login": 0              # User login (no XP reward, just tracking)
}