export default {
	path: "/movie",
	component: () => import("@/views/Movie"),
	children: [
		{
			path: "city",
			component: () => import("@/components/City")
		},
		{
			path: "nowplaying",
			component: () => import("@/components/Nowplaying")
		},
		{
			path: "commingsoon",
			component: () => import("@/components/Commingsoon")
		},
		{
			path: "search",
			component: () => import("@/components/Search")
		},
		{
			path: "detail/1/:filmId",
			components: {
				default: () => import("@/components/Nowplaying"),
				detail: () => import("@/views/Movie/Detail")
			},
			props: {
				detail: true
			}
		},
		{
			path: "detail/2/:filmId",
			components: {
				default: () => import("@/components/Commingsoon"),
				detail: () => import("@/views/Movie/Detail")
			},
			props: {
				detail: true
			}
		},
		{
			path: "/movie",
			redirect: "/movie/nowplaying"
		}
	]
}