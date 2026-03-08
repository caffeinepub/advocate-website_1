import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Int "mo:core/Int";
import Order "mo:core/Order";

actor {
  type LegalMatterType = {
    #criminal;
    #civil;
    #family;
    #corporate;
    #property;
    #other;
  };

  type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    matterType : LegalMatterType;
    timestamp : Time.Time;
  };

  module ContactSubmission {
    public func compareByTimestamp(a : ContactSubmission, b : ContactSubmission) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  type Testimonial = {
    clientName : Text;
    reviewText : Text;
    starRating : Nat;
  };

  var nextId = 0;
  let contactSubmissions = Map.empty<Nat, ContactSubmission>();
  let testimonials = Map.empty<Text, Testimonial>();

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, phone : Text, message : Text, matterType : LegalMatterType) : async Nat {
    let id = nextId;
    let submission : ContactSubmission = {
      id;
      name;
      email;
      phone;
      message;
      matterType;
      timestamp = Time.now();
    };

    contactSubmissions.add(id, submission);
    nextId += 1;
    id;
  };

  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    let iter = contactSubmissions.values();
    let submissionsArray = iter.toArray();
    submissionsArray.reverse();
  };

  public shared ({ caller }) func addTestimonial(clientName : Text, reviewText : Text, starRating : Nat) : async () {
    if (starRating < 1 or starRating > 5) {
      Runtime.trap("Star rating must be between 1 and 5");
    };

    let testimonial : Testimonial = {
      clientName;
      reviewText;
      starRating;
    };

    testimonials.add(clientName, testimonial);
  };

  public query ({ caller }) func getAllTestimonials() : async [Testimonial] {
    let iter = testimonials.values();
    iter.toArray();
  };

  public query ({ caller }) func getTestimonialsByRating(reversed : Bool) : async [Testimonial] {
    let testimonialsArray = testimonials.values().toArray();
    let sorted = testimonialsArray.sort(
      func(a, b) {
        if (reversed) {
          Nat.compare(b.starRating, a.starRating);
        } else {
          Nat.compare(a.starRating, b.starRating);
        };
      }
    );
    sorted;
  };
};
