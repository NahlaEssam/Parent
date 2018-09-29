export interface Token {
    id: string;
}

export interface UserDetails {
    id: number;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface User {
    name: string;
    job: string;
}

export interface UserList {
    page:  number;
    per_page:  number;
    total:  number;
    total_pages:  number;
    data: UserDetails[];
}
