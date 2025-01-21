import type { TItems } from '../items.data'

export interface FiltersProps {
	sortBy: SortBy
	searchQuery: string
}

export interface ItemsProps extends TItems {
	isAdded: boolean
	isFavorite: boolean
	favoriteId?: number | null
}

export interface FavoriteProps extends TItems {
	parentId: number
}

export type SortBy = 'title' | 'price' | '-price'

export interface FiltersInHomeProps {
	sortBy: SortBy
	searchQuery: string
}