
const searchRecipeImage = async (recipeTitle) => {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;

    if (!accessKey) {
        throw new Error("Unsplash API key is not configured");
    }

    const params = new URLSearchParams({
        query: `${recipeTitle} food`,
        per_page: "1",
        orientation: "landscape"
    });

    const response = await fetch(
        `https://api.unsplash.com/search/photos?${params}`,
        {
            headers: {
                Authorization: `Client-ID ${accessKey}`
            }
        }
    );

    if (!response.ok) {
        throw new Error(
            `Unsplash API request failed: ${response.status}`
        );
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        return null;
    }

    const photo = data.results[0];

    return {
        imageUrl: photo.urls.regular,
        photographer: photo.user.name,
        photographerUrl: photo.user.links.html,
        photoUrl: photo.links.html
    };
};

module.exports = searchRecipeImage;
