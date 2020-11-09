export const FLICKR_API_URL = "https://api.flickr.com/services/rest/";

export const search = async (apiKey, query, limit) => {
  const url = new URL(FLICKR_API_URL);
  url.searchParams.append("method", "flickr.photos.search");
  url.searchParams.append("api_key", apiKey);
  url.searchParams.append("tags", query);
  url.searchParams.append("per_page", limit);
  url.searchParams.append("format", "json");
  url.searchParams.append("nojsoncallback", 1);

  const res = await fetch(url);
  const data = await res.text();
  return JSON.parse(data);
};
