export const load = async () => {
    const fetchData = async () => {
        const response = await fetch("https://api.spacexdata.com/v3/landpads");
        return await response.json();
    };

    return {
        data: await fetchData(),
    };
};