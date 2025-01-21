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
	itemId: number
}

export type SortBy = 'title' | 'price' | '-price'

export interface FiltersInHomeProps {
	sortBy: SortBy
	searchQuery: string
}

export interface FavoritesProps {
	itemId: number
	item: TItems
	id: number
}