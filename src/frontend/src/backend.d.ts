import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface ContactSubmission {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
    matterType: LegalMatterType;
}
export interface Testimonial {
    starRating: bigint;
    clientName: string;
    reviewText: string;
}
export enum LegalMatterType {
    other = "other",
    civil = "civil",
    criminal = "criminal",
    property = "property",
    corporate = "corporate",
    family = "family"
}
export interface backendInterface {
    addTestimonial(clientName: string, reviewText: string, starRating: bigint): Promise<void>;
    getAllContactSubmissions(): Promise<Array<ContactSubmission>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    getTestimonialsByRating(reversed: boolean): Promise<Array<Testimonial>>;
    submitContactForm(name: string, email: string, phone: string, message: string, matterType: LegalMatterType): Promise<bigint>;
}
