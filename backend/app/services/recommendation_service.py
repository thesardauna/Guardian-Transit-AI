from app.services.gemini_service import GeminiService


class RecommendationService:
    """
    AI-powered recommendation engine for safe transport choices.

    Responsible for:
    - Suggesting safest vehicles/drivers
    - Ranking transport options
    - Personalizing recommendations based on user behavior
    """

    def __init__(self):
        self.ai = GeminiService()

    def recommend_safest_transport(self, user_profile: dict, options: list) -> dict:
        """
        Returns the safest transport option based on AI + scoring.
        """

        prompt_data = {
            "user_profile": user_profile,
            "available_options": options
        }

        ai_result = self.ai.recommend_safest_route(options)

        best_index = ai_result.get("best_route_index", 0)

        return {
            "recommended_option": options[best_index] if options else None,
            "reason": ai_result.get("reason"),
            "risk_analysis": ai_result.get("risk_analysis"),
            "all_options_ranked": self._rank_options(options)
        }

    def rank_drivers_by_safety(self, drivers: list) -> list:
        """
        Ranks drivers using safety score + AI reasoning.
        """

        ranked = sorted(
            drivers,
            key=lambda d: (
                d.get("safety_score", 50) * 0.6 +
                d.get("rating", 3) * 0.4
            ),
            reverse=True
        )

        return ranked

    def recommend_routes(self, routes: list) -> dict:
        """
        AI-assisted route recommendation system.
        """

        ai_result = self.ai.recommend_safest_route(routes)

        return {
            "best_route": routes[ai_result.get("best_route_index", 0)],
            "reason": ai_result.get("reason"),
            "risk_analysis": ai_result.get("risk_analysis")
        }

    def personalized_recommendation(self, user_history: dict, options: list) -> dict:
        """
        Personalized AI recommendations based on user behavior.
        """

        # Simple personalization logic (can be upgraded later)
        preference_weight = user_history.get("preferred_safety", 0.7)

        scored_options = []

        for option in options:
            score = (
                option.get("safety_score", 50) * preference_weight +
                option.get("cost_score", 50) * (1 - preference_weight)
            )

            scored_options.append({
                "option": option,
                "score": score
            })

        ranked = sorted(scored_options, key=lambda x: x["score"], reverse=True)

        return {
            "top_recommendation": ranked[0]["option"] if ranked else None,
            "ranked_list": ranked
        }

    def _rank_options(self, options: list) -> list:
        """
        Internal ranking function for transparency.
        """
        return sorted(
            options,
            key=lambda x: x.get("safety_score", 0),
            reverse=True
        )
